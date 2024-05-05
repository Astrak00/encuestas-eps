import { FCSJ, FHCD } from "./constants.js";

// Parse the CSV data
export function parseCSV(csv) {
  // Parse CSV
  const parsedData = Papa.parse(csv, { header: true });
  parsedData.data.push({ GRADO: "FCSJ", P: FCSJ });
  parsedData.data.push({ GRADO: "FHCD", P: FHCD });

  // Sort data by percentage
  parsedData.data.sort((a, b) => {
    const percentageA = parseFloat(a["P"].replace("%", ""));
    const percentageB = parseFloat(b["P"].replace("%", ""));
    return percentageB - percentageA;
  });

  // Arrays to store names and percentages
  let names = [];
  let percentages = [];

  // Iterate through each row of parsed data
  parsedData.data.forEach((row) => {
    // Extract name and percentage from each row
    const name = row["GRADO"];
    const percentage = parseFloat(row["P"]);

    // Push name and percentage to respective arrays
    names.push(name);
    percentages.push(percentage);
  });

  // Add the index to the names at the end
  names.forEach((name, index) => {
    names[index] = `${name} (${index + 1})`;
  });

  names.forEach((name, index) => {
    names[index] = name
      .replace(
        "Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación",
        "Datos & Teleco"
      )
      .replace(
        "Doble Grado en Ingeniería Física e Ingeniería en Tecnologías Industriales",
        "Física & Industriales"
      )
      .replace("Administración de Empresas", "ADE")
      .replace("Grado en Ingeniería", "")
      .replace("Ingeniería", "")
      .replace("Tecnologías", "")
      .replace("Grado", "")
      .replace("Doble", "")
      .replace(" de", " ")
      .replace(" en", " ")
      .replace(" la", " ")
      .trimStart();
  });

  // Return the arrays
  return { names, percentages };
}
