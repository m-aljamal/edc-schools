const excelType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
const wordType = "application/vnd.google-apps.document"
export const teacherFolders = [
    {
        mainFolder: "إثراء المنهاج",
        file: "إثراء المناهج.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "الخطة الدرسية",
        file:"التقويم الدراسي.xlsx",
        mimeType: excelType ,
        subFolders:[
            {
                folder: "الخطة الدرسية الفصلية",
                file: "خطة توزيع المنهج للفصل الدراسي.docx",
                mimeType:  wordType
            },
            {
                folder:"الخطة الدرسية الأسبوعية", 
                file:"الخطة الأسبوعية للمعلم.xlsx",
                mimeType: excelType ,
            }
        ],
    },
    {
        mainFolder: "أوراق العمل",
        subFolders:[
            {
                folder: "الفصل الثاني",
            },
            {
                folder: "الفصل الأول",
            },
            {
                folder: "النادي الصيفي"
            },
        ],
    },
    {
        mainFolder: "تحضير الدروس",
        file: "دفتر تحضير.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "تحليل نتائج الاختبارات",
        file: "تحليل نتائج الاختبارات.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "تنمية المهارات والمواهب",
        file: "تنمية المهارات والمواهب.docx",
        mimeType:  wordType
    },
]
export const manger = [
    {
        mainFolder: "إذن إنصراف",
        file: "إذن بالانصراف.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "استجواب",
        file: "استجواب.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "استئذان موظف",
        file: "استئذان موظف.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "إقالة موظف",
        file: "استئذان موظف.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "التقويم الدراسي وجدول الفعاليات",
        file: "التقويم الدراسي وجدول الفعاليات.xlsx",
        mimeType:  excelType
    },
    {
        mainFolder: "انفكاك موظف",
        file: "انفكاك موظف.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "تعهد ولي أمر",
        file: "تعهد ولي أمر.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "تقرير الإنجازات التربوية والأنشطة المدرسية",
        file: "تقرير الإنجازات التربوية والأنشطة المدرسية.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "تنبيه للمعلم كتابي",
        file: "تنبيه للمعلم كتابي.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "قرار فصل طالب",
        file: "قرار فصل طالب.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "مباشرة عمل",
        file: "مباشرة عمل.docx",
        mimeType:  wordType
    },
    {
        mainFolder: "مكافات خاصة",
        file: "مكافات خاصة.docx",
        mimeType:  wordType
    },
]