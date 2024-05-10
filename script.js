import { parseCSV } from "./data-manager.js";

const ctx = document.getElementById("myChart");

// Fetch the CSV file from the server
function fetchCSV() {
  return fetch("/data.csv") // Adjust the URL as needed based on your server configuration
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data.csv");
      }
      return response.text();
    });
}

// CSV data
function processData() {
  fetchCSV().then((csv) => {
    const { names, percentages } = parseCSV(csv);

    // Call the function with the CSV data
    //const { names, percentages } = parseCSV(csv_);

    const colors_array = Array(names.length).fill("#404040");

    colors_array[names.findIndex((name) => name.includes("ESCUELA"))] = "#3BC4A0";
    colors_array[names.findIndex((name) => name.includes("FCSJ"))] = "#FFBF1F";
    colors_array[names.findIndex((name) => name.includes("FHCD"))] = "#5599DD";

    // Customize colors
    colors_array[0] = "#ffc514";
    colors_array[1] = "#d2cdcd";
    colors_array[2] = "#d6772e";

    Chart.defaults.font.family = "Montserrat";

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: names,
        datasets: [
          {
            label: "% de votos",
            data: percentages,
            borderWidth: 1,
            backgroundColor: colors_array,
          },
        ],
      },
      options: {
        indexAxis: "y",
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "right",
            labels: {
              font: {
                family: "Montserrat",
              },
              color: "black", // Set the color of legend labels here
            },
          },

          title: {
            display: true,
            text: "Índice de participación por grado",
            font: {
              family: "Montserrat",
              weight: "bold",
              size: 20,
            },
            color: "black",
          },
        },
       	scales: {
        	y: {
        		grid: {
        			display: false
        		}
        	}
       },
      },
    });
  });
}

processData();
