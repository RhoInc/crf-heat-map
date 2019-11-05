export default function reportWorkBook(sheetNames) {
    sheetNames.push('Filters');
    this.SheetNames = sheetNames;
    this.Sheets = [];
}
