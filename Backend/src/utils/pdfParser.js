import PDFParser from "pdf2json";

export const parsePDF = (fileBuffer) => {
  return new Promise((resolve, reject) => {

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataReady", (pdfData) => {

      let text = "";

      pdfData.Pages.forEach((page) => {

        const lines = {};

        page.Texts.forEach((textItem) => {

          const y = textItem.y;

          if (!lines[y]) lines[y] = [];

          const decoded = decodeURIComponent(textItem.R[0].T);

          lines[y].push(decoded);

        });

        Object.keys(lines)
          .sort((a, b) => a - b)
          .forEach((line) => {
            text += lines[line].join(" ") + "\n";
          });

      });

      resolve(text);

    });

    pdfParser.on("pdfParser_dataError", reject);

    // ✅ IMPORTANT
    pdfParser.parseBuffer(fileBuffer);

  });
};