import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getTableBody = (tasks) => {
  const tableData = tasks.map((task) => {
    delete task.id
    return Object.values(task)
  })
  return [
    ['Date', 'Hours Worked', 'Work with Staff', 'Description'],
    ...tableData,
  ]
}

export const generatePDf = (
  tasks,
  name,
  payPeriod,
  chargeString,
  date,
  totalHours,
  totalStaff,
  totalDays
) => {
  const tableBody = getTableBody(tasks)
  const documentDef = {
    pageSize: 'A4',
    content: [
      {
        text: 'The Asia Foundation',
        margin: [0, 0, 0, 5],
        alignment: 'center',
      },
      {
        text: 'Time Sheet',
        margin: [0, 0, 0, 5],
        alignment: 'center',
      },
      {
        text: `Name: ${name}`,
        margin: [0, 0, 0, 5],
      },
      {
        text: `Pay Period: ${payPeriod}`,
        margin: [0, 0, 0, 5],
      },
      {
        text: `Charge String: ${chargeString}`,
        margin: [0, 0, 0, 5],
      },
      {
        // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 80, 80, '*'],
          body: tableBody,
        },
        margin: [0, 20, 0, 20],
      },
      {
        text: `Total Hours: ${totalHours}`,
        margin: [0, 0, 0, 5],
      },
      {
        text: `Total Staffs: ${totalStaff}`,
        margin: [0, 0, 0, 5],
      },
      {
        text: `Total Days: ${totalDays}`,
        margin: [0, 0, 0, 5],
      },
      {
        text: `*** Remark: 8 hours is 1 working day`,
        margin: [0, 0, 0, 5],
      },
      {
        text: `Submitted By: ${name}`,
        margin: [0, 0, 0, 5],
      },
      {
        text: `Date: ${date}`,
        margin: [0, 0, 0, 5],
      },
    ],
  }
  pdfMake.createPdf(documentDef).download(`${name} - ${payPeriod}`)
}
