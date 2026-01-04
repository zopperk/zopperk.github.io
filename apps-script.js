const SPREADSHEET_ID = "107m2hgu15vR0mgrcrImkuder4r1DHRptcd7KUzpbvF4"; // replace with your spreadsheet ID
const GRADES_SHEET_NAME = "Grades";
const NOTES_SHEET_NAME = "Daily Notes";

// Month abbreviations for your headers
const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// --- Web app entry points ---
function doPost(e) {
  return handleSubmission(e);
}

function doGet(e) {
  return handleSubmission(e);
}

// --- Main submission logic ---
function handleSubmission(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const gradesSheet = ss.getSheetByName(GRADES_SHEET_NAME);
  const notesSheet = ss.getSheetByName(NOTES_SHEET_NAME);

  const grade = e.parameter.grade;
  const notes = e.parameter.notes || "";
  const now = new Date();

  const todayDay = now.getDate();                       // 1–31
  const todayMonthAbbr = MONTH_ABBR[now.getMonth()];    // Jan, Feb, etc.

  // --- Find month column in B3:M3 ---
  const monthRange = gradesSheet.getRange("B3:M3").getValues()[0];
  let monthCol = null;
  for (let c = 0; c < monthRange.length; c++) {
    const cellValue = monthRange[c].toString().trim();
    if (cellValue === todayMonthAbbr) {
      monthCol = c + 2; // B=2
      break;
    }
  }

  // --- Find day row in A4:A34 ---
  const dayRange = gradesSheet.getRange("A4:A34").getValues();
  let dayRow = null;
  for (let r = 0; r < dayRange.length; r++) {
    const cellValue = dayRange[r][0].toString().trim();
    if (parseInt(cellValue) === todayDay) {
      dayRow = r + 4; // A4 = row 4
      break;
    }
  }

  // --- Write grade ---
  let wroteGrade = false;
  if (monthCol && dayRow) {
    gradesSheet.getRange(dayRow, monthCol).setValue(grade);
    wroteGrade = true;
  }

  // --- Append to Daily Notes ---
  // Columns: Today, Grade, Notes, Submission Timestamp
  const submissionTime = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  notesSheet.appendRow([now, grade, notes, submissionTime]);

  return ContentService.createTextOutput(
    wroteGrade ? "Success" : "Grade cell not found"
  );
}