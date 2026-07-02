/* ============================= Phase 3 Layer 1: deterministic wrong-answer rubrics =============================
   Keyed by lesson.id (see track-b.js: lessons.forEach((l,i)=>{ l.id=i+1; })).
   Each entry names a specific wrong blank value (or, for order-type lessons, blankId:'chips' for any
   swapped sequence) and an in-character line to show instead of the generic "Не съвсем" message. */
export const RUBRICS = {
  1: [ // Обличаме Мия за бала (order)
    {blankId:'chips', wrongValue:'swapped', concept:'sequence_order', character:'luna',
     line:'Мяу, обувки върху боси крачета ще стягат — първо чорапите, после роклята, накрая обувките! 🐱'}
  ],
  2: [ // Възрастта на Луна (blanks: b1 number, correct 2)
    {blankId:'b1', wrongValue:'3', concept:'off_by_one', character:'bo',
     line:'Бау, с едно повече е — Луна е мъничка, свали годинката и опитай пак! 🐾'}
  ],
  3: [ // Какъв тип е Бо (blanks: b1 int, b2 string, b3 bool)
    {blankId:'b1', wrongValue:'string', concept:'type_int_vs_string', character:'mia',
     line:'Годините са число, а не думичка — за цели числа ползваме int! 🔢'},
    {blankId:'b1', wrongValue:'bool', concept:'type_int_vs_bool', character:'luna',
     line:'Мяу, 5 не е вярно или невярно — bool пази само true и false, а годините искат int!'},
    {blankId:'b2', wrongValue:'int', concept:'type_string_vs_int', character:'bo',
     line:'Бау, името ми не е число — за текст в кавички ползваме string! 🐶'},
    {blankId:'b2', wrongValue:'bool', concept:'type_string_vs_bool', character:'mia',
     line:'Име не може да е true или false — текстът си иска типа string!'},
    {blankId:'b3', wrongValue:'int', concept:'type_bool_vs_int', character:'luna',
     line:'true не е число за броене, мяу — за вярно и невярно има специален тип bool!'},
    {blankId:'b3', wrongValue:'string', concept:'type_bool_vs_string', character:'bo',
     line:'Гладен съм си наистина, но true не е текст — това е работа за bool! 🦴'}
  ],
  4: [ // Мия се представя (order)
    {blankId:'chips', wrongValue:'swapped', concept:'sequence_order', character:'mia',
     line:'Първо казвам здравей и чак после годините — поздравът винаги върви пръв! 👋'}
  ],
  5: [ // Бисквитките на Бо (blanks: b1 operator, correct '+')
    {blankId:'b1', wrongValue:'-', concept:'operator_minus_vs_plus', character:'luna',
     line:'С минус бисквитките изчезват, мяу — Бо иска да събере двете купчинки в една!'},
    {blankId:'b1', wrongValue:'*', concept:'operator_times_vs_plus', character:'mia',
     line:'Умножението прави цели 12 — Бо просто слага 3 бисквитки при другите 4, събери ги! ➕'},
    {blankId:'b1', wrongValue:'/', concept:'operator_divide_vs_plus', character:'bo',
     line:'Бау, делението ще ми остави само трошички — искам двете купчинки заедно, събери ги! 🦴'}
  ],
  7: [ // Кой пази къщата (blanks: b1 comparison operator, correct '>')
    {blankId:'b1', wrongValue:'<', concept:'comparison_less_vs_greater', character:'luna',
     line:'Мяу, погледни числата пак — 4 не е по-малко от 2, стрелкичката сочи в грешната посока!'},
    {blankId:'b1', wrongValue:'==', concept:'comparison_equal_vs_greater', character:'mia',
     line:'Двете равни питат дали 4 и 2 са еднакви, а те не са — сравни кой е по-голям! 🤔'},
    {blankId:'b1', wrongValue:'>=', concept:'comparison_gte_vs_greater', character:'bo',
     line:'Близо си, бау — този знак пита по-голямо или равно, но аз съм точно по-голям, стига само по-голямо!'}
  ]
};

export const RUBRIC_CHAR_LABEL = { luna:'🐱 Луна', bo:'🐶 Бо', mia:'👗 Мия' };
