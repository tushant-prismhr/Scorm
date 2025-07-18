<script>
import ExcelJS from "exceljs";

export default {
  data() {
    return {
      previewData: [],
      heading: [],
      validationErrors: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      console.log("file", file);
      if (!file) return;

      if (file.name.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          // Parse CSV manually (simple split, or use a CSV parser if needed)
          const rows = text.split(/\r?\n/).map((row) => row.split(","));
          this.heading = rows[0] || [];
          this.previewData = rows.slice(1);
          this.validateRows(rows);
        };
        reader.readAsText(file);
      } else if (file.name.endsWith(".xlsx")) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const buffer = e.target.result;
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer);
          const worksheet = workbook.worksheets[0];
          const data = [];
          worksheet.eachRow({ includeEmpty: true }, function (row) {
            data.push(row.values.slice(1)); // Remove first empty element
          });
          this.heading = data[0] || [];
          this.previewData = data.slice(1);
          this.validateRows(data);
        };
        reader.readAsArrayBuffer(file);
      } else {
        this.validationErrors = ["Unsupported file type."];
        return;
      }
    },
    validateRows(rows) {
      const errors = [];

      rows.forEach((row, index) => {
        console.log("row", row);
        // Example validation: each row must have exactly 3 columns
        if (row.length < 3) {
          errors.push(`Row ${index + 1} must have minimum 3 columns.`);
        } // Add more custom validations here // e.g., check if a column is a valid email, number, etc.
        if (row[0] == "") {
          errors.push(`First Name can not be empty.`);
        }
        if (row[1] == "") {
          errors.push(`Last Name can not be empty.`);
        }
      });

      this.validationErrors = errors;
    },
  },
};
</script>

<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".csv, .xlsx" />
    <div v-if="validationErrors.length">
      <h3>Validation Errors</h3>
      <ul>
        <li v-for="(error, index) in validationErrors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div v-if="previewData.length">
      <h3>Preview (First 4 Rows)</h3>
      <table>
        <tr>
          <th v-for="cell in heading" :key="cell">{{ cell }}</th>
        </tr>
        <tr v-for="(row, index) in previewData" :key="index">
          <td v-for="(cell, i) in row" :key="i">{{ cell }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid #ccc;
  padding: 4px 8px;
}
</style>
