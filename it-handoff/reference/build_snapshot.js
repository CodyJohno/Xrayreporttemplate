const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
  PageBreak, HeightRule, TabStopType, TabStopPosition
} = require("docx");

/* ---------- Brand palette (matched to original) ---------- */
const GREEN     = "12AA66";
const NAVY      = "1A2E4C";
const DARKGREY  = "626D7C";
const PALEGREEN = "E8F4EE";
const WHITE     = "FFFFFF";
const BLACK     = "000000";

/* ---------- Layout constants ---------- */
const CONTENT_W = 9026;            // A4 with 1440 L/R margins
const PAGE_W    = 11906;
const PAGE_H    = 16838;

const thin   = { style: BorderStyle.SINGLE, size: 4,  color: "D9DDE2" };
const noBdr  = { style: BorderStyle.NONE,   size: 0,  color: "FFFFFF" };
const bdrAll = { top: thin, bottom: thin, left: thin, right: thin };
const bdrNone= { top: noBdr, bottom: noBdr, left: noBdr, right: noBdr };

/* ---------- Helpers ---------- */
const tr = (text, opts = {}) => new TextRun({ text, font: "Arial", ...opts });
const p  = (children, opts = {}) =>
  new Paragraph({ children: Array.isArray(children) ? children : [children], ...opts });

function cell({ children, width, fill, borders = bdrAll, align = VerticalAlign.TOP, margins, span }) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    borders,
    verticalAlign: align,
    margins: margins || { top: 80, bottom: 80, left: 160, right: 160 },
    columnSpan: span,
    children
  });
}

/* ---------- Reusable blocks ---------- */
function h2(text) {
  return p(tr(text, { bold: true, size: 24, color: NAVY }), {
    spacing: { before: 160, after: 80 }
  });
}

function bodyPara(text, opts = {}) {
  return p(tr(text, { size: 20, color: BLACK }), {
    spacing: { after: 80, line: 280 }, ...opts
  });
}

/* ---------- Header (logo) ---------- */
const headerLogo = new Header({
  children: [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 60 },
      children: [
        new ImageRun({
          type: "png",
          data: fs.readFileSync("assets/logo.png"),
          transformation: { width: 160, height: 34 },
          altText: { title: "Johnson's WA", description: "Johnson's WA logo", name: "logo" }
        })
      ]
    })
  ]
});

/* ---------- Title block ---------- */
function titleBlock() {
  return [
    p(tr("Your Grower Quality Snapshot", { bold: true, size: 36, color: NAVY }),
      { spacing: { before: 0, after: 60 } }),
    p([
        tr("Yarranabee Holdings Pty Ltd", { bold: true, size: 20, color: DARKGREY }),
        tr("   |   Season 25/26   |   Highbury, WA   |   17 Jun 2026", { size: 20, color: DARKGREY })
      ],
      { spacing: { after: 140 } }),
    p(tr(
      "Thanks for another season of supplying us. Because we scan every bale with X-ray quality " +
      "testing, we can share a clear picture of what is coming through in your hay, something most " +
      "growers never see. We hope it helps your planning, and we are always happy to talk it through.",
      { size: 20, color: BLACK }), { spacing: { after: 160 }, line: 280 })
  ];
}

/* ---------- Glance row (3 stat cells) ---------- */
function glanceRow() {
  const w = Math.floor(CONTENT_W / 3);
  const make = (big, small) => cell({
    width: w,
    fill: PALEGREEN,
    borders: bdrNone,
    align: VerticalAlign.CENTER,
    margins: { top: 140, bottom: 140, left: 120, right: 120 },
    children: [
      p(tr(big, { bold: true, size: 36, color: GREEN }), { alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
      p(tr(small, { size: 16, color: NAVY, bold: true }), { alignment: AlignmentType.CENTER })
    ]
  });
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [w, w, CONTENT_W - 2*w],
    rows: [new TableRow({
      children: [
        make("1,911", "BALES SCANNED  (3 of 9 paddocks)"),
        make("95.1%", "EXPORTABLE PRODUCT"),
        make("4.9%",  "OVERALL REJECT RATE")
      ]
    })]
  });
}

/* ---------- Generic data table ---------- */
function dataTable(headers, rows, colWidths, options = {}) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((t, i) => cell({
      width: colWidths[i],
      fill: NAVY,
      children: [p(tr(t, { bold: true, color: WHITE, size: 20 }))]
    }))
  });
  const bodyRows = rows.map((row, ri) => new TableRow({
    children: row.map((c, i) => {
      const isObj = typeof c === "object" && c !== null;
      const text  = isObj ? c.text : c;
      const bold  = isObj ? !!c.bold : false;
      const color = isObj ? (c.color || BLACK) : BLACK;
      const fill  = ri % 2 === 0 ? "F7F9FA" : WHITE;
      return cell({
        width: colWidths[i],
        fill,
        children: [p(tr(text, { bold, color, size: 20 }))]
      });
    })
  }));
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...bodyRows]
  });
}

/* ---------- Branded navy banner ---------- */
function brandedBanner(lines) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      cantSplit: true,
      children: [cell({
        width: CONTENT_W,
        fill: NAVY,
        borders: bdrNone,
        margins: { top: 160, bottom: 160, left: 280, right: 280 },
        children: lines.map(line => p(line, { alignment: AlignmentType.CENTER, spacing: { after: 60 } }))
      })]
    })]
  });
}

/* ---------- Page 3: bale example block ---------- */
function baleExample(label, paddock, argt, bale, status, statusColor, imagePath, imgW, imgH, caption) {
  const headerTable = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      children: [cell({
        width: CONTENT_W,
        fill: NAVY,
        borders: bdrNone,
        margins: { top: 100, bottom: 100, left: 200, right: 200 },
        children: [
          p([
            tr(label, { bold: true, size: 22, color: WHITE }),
            tr("    ", { color: WHITE }),
            tr(`${paddock} (${argt})`, { size: 18, color: WHITE }),
            tr("   ·   ", { color: WHITE, size: 18 }),
            tr(`Bale ${bale}`, { size: 18, color: WHITE })
          ])
        ]
      })]
    })]
  });

  const tag = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [Math.floor(CONTENT_W*0.25), CONTENT_W - Math.floor(CONTENT_W*0.25)],
    rows: [new TableRow({
      children: [
        cell({
          width: Math.floor(CONTENT_W*0.25),
          fill: statusColor,
          borders: bdrNone,
          align: VerticalAlign.CENTER,
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          children: [p(tr(status, { bold: true, color: WHITE, size: 18 }), { alignment: AlignmentType.CENTER })]
        }),
        cell({
          width: CONTENT_W - Math.floor(CONTENT_W*0.25),
          fill: PALEGREEN,
          borders: bdrNone,
          align: VerticalAlign.CENTER,
          margins: { top: 60, bottom: 60, left: 160, right: 160 },
          children: [p(tr("X-ray plant capture, supervisor scan mode", { size: 18, color: NAVY, italics: true }))]
        })
      ]
    })]
  });

  const image = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 60, after: 40 },
    keepNext: true,
    keepLines: true,
    children: [new ImageRun({
      type: "png",
      data: fs.readFileSync(imagePath),
      transformation: { width: imgW, height: imgH },
      altText: { title: label, description: `${label} ${argt} bale ${bale}`, name: `bale_${bale}` }
    })]
  });

  const captionPara = bodyPara(caption, { spacing: { after: 100 } });

  return [headerTable, tag, image, captionPara];
}

/* ---------- Document content ---------- */
const children = [
  /* PAGE 1 */
  ...titleBlock(),
  glanceRow(),

  h2("What Our X-Ray Found"),
  bodyPara(
    "Here is how many flags were recorded in each category across your 1,911 bales. A bale can be " +
    "flagged for more than one thing, so the total number of flags is higher than the number of bales affected."
  ),
  dataTable(
    ["Category", "Flags Recorded", "Notes"],
    [
      [{ text: "Stone", bold: true },   "672", "Main contributor"],
      [{ text: "Dirt",  bold: true },   "258", "Second largest contributor"],
      ["Moisture", "28",  "Do not be concerned"],
      ["Wire",     "14",  "Usually old fencing wire"],
      ["Others",   "8",   ""]
    ],
    [2600, 2200, 4226]
  ),
  bodyPara(
    "Stone and dirt are the largest factors this season. That pattern usually points to ground and soil " +
    "picked up during cutting, raking or baling, rather than anything wrong with the hay. Moisture is " +
    "currently an issue on our side rather than yours, so please do not be concerned about those flags.",
    { spacing: { before: 140, after: 160 } }
  ),

  h2("How Your Paddocks Compared"),
  bodyPara("Your three scanned paddocks did not all behave the same way."),
  dataTable(
    ["Paddock (ARGT)", "Bales", "Reject Rate", "Exported To", "Status"],
    [
      [{ text: "Tom’s (W20250029)" },  "678", { text: "2.4%",  bold: true, color: GREEN }, "[ add country ]", "Very clean"],
      [{ text: "Pip’s (W20250030)" },  "929", { text: "4.0%",  bold: true, color: GREEN }, "[ add country ]", "Solid"],
      [{ text: "Rosies (W20250027)" },      "304", { text: "13.2%", bold: true, color: "C0392B" }, "[ add country ]", "Worth a look"]
    ],
    [2267, 833, 1500, 2400, 2026]
  ),

  h2("Your Reject Rate"),
  dataTable(
    ["Measure", "Reject Rate"],
    [
      [{ text: "Your bales (Yarranabee Holdings)", bold: true }, { text: "4.9%", bold: true, color: GREEN }],
      [{ text: "Our company target" }, { text: "3.0% or under", bold: true, color: NAVY }]
    ],
    [5500, 3526]
  ),

  h2("What This Means for You"),
  bodyPara(
    "Because we run a slicer plant rather than a decontamination line, what we record is what ships, " +
    "so every reject is one we have stopped before it reaches your customer. Ahead of your next cut, " +
    "checking cutting and baler pickup height and ground conditions can make a real difference to stone " +
    "and dirt pickup, especially on looser or rockier ground. We are happy to talk it through if it helps.",
    { spacing: { after: 120 } }
  ),

  brandedBanner([
    [
      tr("Feeding the animals that feed the world.", { bold: true, italics: true, color: GREEN, size: 22 })
    ],
    [
      tr(
        "Your hard work in the paddock helps feed livestock right around the world. Thank you for growing " +
        "with us, and for helping us keep doing exactly that.",
        { color: WHITE, size: 18 }
      )
    ],
    [
      tr("The Johnson’s WA Team", { bold: true, color: WHITE, size: 18 })
    ]
  ]),

  /* PAGE 2 */
  p(tr("Supporting Data", { bold: true, size: 32, color: NAVY }),
    { pageBreakBefore: true, spacing: { after: 120 } }),
  bodyPara(
    "The figures in this snapshot come directly from our live Power BI quality dashboard. The screenshot " +
    "below shows the Reject Summary for your hay this season, and the table beneath confirms how each " +
    "headline figure traces back to that data."
  ),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 80 },
    children: [new ImageRun({
      type: "png",
      data: fs.readFileSync("assets/powerbi.png"),
      transformation: { width: 540, height: 251 },
      altText: { title: "Power BI Reject Summary", description: "Power BI screenshot", name: "powerbi" }
    })]
  }),
  p(tr("Power BI, Raw Material Rejects, Reject Summary. Yarranabee Holdings Pty Ltd, data updated 17/06/26.",
       { italics: true, size: 16, color: DARKGREY }),
    { alignment: AlignmentType.CENTER, spacing: { after: 200 } }),

  h2("How the Figures Reconcile"),
  dataTable(
    ["Figure", "Value from dashboard"],
    [
      ["Total bales scanned", { text: "1,911", bold: true }],
      ["Clean bales",         "1,162"],
      ["Contaminated or rejected", "749"],
      [{ text: "Exportable product", bold: true }, { text: "95.1%", bold: true, color: GREEN }],
      [{ text: "Overall reject rate", bold: true }, { text: "4.9%",  bold: true, color: GREEN }],
      ["Paddocks (ARGTs) scanned", "3 of 9"]
    ],
    [5800, 3226]
  ),
  bodyPara(
    "Every figure on the first page is drawn from this dataset, so the snapshot reflects real operational " +
    "results rather than estimates.",
    { spacing: { before: 160, after: 200 } }
  ),

  brandedBanner([
    [tr("Thank you for your support this season.", { bold: true, italics: true, color: GREEN, size: 22 })],
    [tr(
      "The large majority of your hay is clean and heading to customers around the world. " +
      "You are doing a great job, and we are glad to have you growing with us.",
      { color: WHITE, size: 18 }
    )]
  ]),

  /* PAGE 3 */
  p(tr("What Rejected and Clean Bales Look Like", { bold: true, size: 32, color: NAVY }),
    { pageBreakBefore: true, spacing: { after: 120 } }),
  bodyPara(
    "The three examples below are real scans from your hay this season, showing what we are looking for " +
    "and what we are stopping."
  ),

  ...baleExample(
    "Rejected: Stone Contamination",
    "Rosies", "W20250027", "110",
    "REJECTED", "C0392B",
    "assets/stones.png", 420, 234,
    "This bale was rejected for stone contamination. The dark blue marks scattered through the bale are " +
    "stones picked up with the hay during baling. The green boxes show what our X-ray flagged automatically."
  ),

  ...baleExample(
    "Clean: No Contamination",
    "Rosies", "W20250027", "117",
    "CLEAN", GREEN,
    "assets/clean.png", 420, 233,
    "This is what a clean bale looks like through the X-ray. No contaminants flagged, no manual marks " +
    "from the operator. The bale goes straight through to the press and into export packaging. The colour " +
    "variation across the image is just density variation, not contamination. This is what we are aiming " +
    "for on every bale."
  ),

  ...baleExample(
    "Rejected: Wire Contamination",
    "Pip’s", "W20250030", "200",
    "REJECTED", "C0392B",
    "assets/wire.png", 420, 236,
    "This bale was rejected for wire in the top half, marked in the image. Wire is one of the most serious " +
    "contaminants we catch because of the injury risk it carries for livestock, so any detection is an " +
    "automatic reject regardless of how clean the rest of the bale looks."
  ),

  p(tr(
    "Note: a few stones on the rejected stone bale are not boxed because we are training an AI tool to " +
    "improve stone detection. The system will catch more of them automatically as the tool develops.",
    { italics: true, size: 16, color: DARKGREY }),
    { alignment: AlignmentType.CENTER, spacing: { before: 60, after: 40 } }),

  p(tr(
    "If you would like to talk through any of these examples, please get in touch with the Johnson’s WA team.",
    { italics: true, size: 18, color: DARKGREY }),
    { alignment: AlignmentType.CENTER, spacing: { before: 40, after: 60 } }),
];

/* ---------- Document ---------- */
const doc = new Document({
  styles: { default: { document: { run: { font: "Arial", size: 20 } } } },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: 720, right: 1440, bottom: 720, left: 1440, header: 480, footer: 480 }
      }
    },
    headers: { default: headerLogo },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/home/claude/Yarranabee_Reject_Report_v2.docx", buf);
  console.log("Built:", buf.length, "bytes");
});
