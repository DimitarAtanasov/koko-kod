import { INTERESTS, fireConfetti, profile, speakText } from './core.js';

/* ============================= TRACK B: 11+ (Koko Kod code lessons) ============================= */
export const TrackB = (function(){
  const chapters = [
    {n:1, title:'Първи стъпки в приказния код', range:[1,6], color:['var(--pink)','var(--pink-deep)'], tags:['story'],
      intro:'Балът в приказното кралство наближава, а Мия, Луна и Бо още не са готови! Помогни им да подредят всяка стъпка по ред — защото в магията на кода редът е всичко.'},
    {n:2, title:'Условия и избори', range:[7,13], color:['var(--lavender)','var(--lavender-deep)'], tags:['logic'],
      intro:'На кръстопът в омагьосаната гора Луна мяука: наляво или надясно? Научи героите да избират мъдро — понеже всеки път крие различно приключение.'},
    {n:3, title:'Магията на повторенията', range:[14,18], color:['var(--mint)','var(--mint-deep)'], tags:['logic','games'],
      intro:'Бо е открил вълшебно колело, което върти нещата отново и отново! Защо да повтаряш сто пъти сам, когато магията на повторението може да го направи вместо теб?'},
    {n:4, title:'Списъци и думи', range:[19,22], color:['var(--peach)','var(--peach-deep)'], tags:['story','logic'],
      intro:'В кулата на кралството има безкраен рафт с думи и съкровища, а Мия трябва да ги подреди едно до друго. Ела да ѝ помогнеш — всяко нещо си има място и номер!'},
    {n:5, title:'По-сложни трикове', range:[23,26], color:['var(--sky)','var(--sky-deep)'], tags:['logic'],
      intro:'Магията става по-дълбока — заклинание вътре в заклинание! Луна, Бо и Мия навлизат в тайните зали на замъка, където само най-хитрите трикове отварят вратите.'},
    {n:6, title:'Истински предизвикателства', range:[27,30], color:['var(--gold)','var(--gold-deep)'], tags:['logic','games'],
      intro:'В кралството се е промъкнала пакостлива грешчица и обърква магиите! Мия, Луна и Бо тръгват на истинско приключение — да я открият, поправят и станат герои на деня.'},
    {n:7, title:'Обекти и какво следва', range:[31,34], color:['var(--rose)','var(--rose-deep)'], tags:['games'],
      intro:'Мия открива, че всяко нещо в кралството — от котето Луна до летящите фенери — си има свои тайни умения. Време е да сътвориш собствени вълшебни създания!'},
    {n:8, title:'Оживей кода — Арената', range:[35,39], color:['var(--coral)','var(--coral-deep)'], tags:['games','animals'],
      intro:'Тръбите свирят — Арената се отваря! Тук магиите оживяват пред очите ти: напиши заклинание и гледай как героят ти наистина се раздвижва.'},
    {n:9, title:'Книга на четката — рисуване с код', range:[40,43], color:['var(--violet)','var(--violet-deep)'], tags:['art'],
      intro:'Луна намери вълшебна четка, която рисува само когато ѝ прошепнеш точните думи. Нарисувай звезди, кули и дъги — с код вместо с бои!'},
    {n:10, title:'Книга на сътворението — направи игра', range:[44,45], color:['var(--amber)','var(--amber-deep)'], tags:['games'],
      intro:'Мия, Луна и Бо имат смела идея — да сътворят своя собствена игра! От небето ще валят звезди, а ти ще решиш как се лови всяка една.'},
    {n:11, title:'Книга на звездите — фестивалът продължава', range:[46,49], color:['var(--indigo)','var(--indigo-deep)'], tags:['story','space'],
      intro:'Фенерите светват, музиката засвирва — големият фестивал на кода започва! Мия, Луна и Бо те чакат на площада, а отвъд портите блестят цели нови светове, готови за истински магьосник като теб.'},
    {n:12, title:'🎁 Тайната глава — Задругата на Звездния код', range:[50,50], color:['var(--confetti-gold)','var(--confetti-gold-deep)'], tags:['story'], secret:true,
      intro:'Шшшт... Само тези, които завършиха всичко останало, виждат тази страница. Когато Луна, Бо и Мия затвориха последната книга, буквите се надигнаха като светулки и се подредиха в тайна карта.'}
  ];
  const YN = [{value:'true',label:'Да'},{value:'false',label:'Не'}];
  const DIR_OPTIONS = [
    {value:'up',label:'нагоре ⬆️'},{value:'down',label:'надолу ⬇️'},
    {value:'left',label:'ляво ⬅️'},{value:'right',label:'дясно ➡️'}
  ];

  const lessons = [
  {title:'Обличаме Мия за бала', type:'order',
   story:'Преди бала Мия трябва да се облече по ред. Подреди командите правилно — първо чорапи, после роклята, а накрая обувките.',
   fact:'В C++ всяка команда на екрана се извежда с cout <<, а редът на командите има значение.',
   chips:[{id:'a',label:'cout << "Обуй чорапи";'},{id:'b',label:'cout << "Сложи роклята";'},{id:'c',label:'cout << "Обуй обувки";'}],
   correctOrder:['a','b','c'], successMsg:'Браво! Мия е готова за бала! 👗✨',
   sequel:{story:'Дрехите са готови! Сега помогни на Мия да сложи бижутата си по ред: първо колие, после обеци, накрая гривна.',
     chips:[{id:'a',label:'cout << "Сложи колие";'},{id:'b',label:'cout << "Сложи обеци";'},{id:'c',label:'cout << "Сложи гривна";'}],
     correctOrder:['a','b','c'], successMsg:'Мия блести с всичките си бижута! 💍✨'}},
  {title:'Възрастта на Луна', type:'blanks',
   story:'Котенцето Луна е на 2 годинки. Запиши възрастта ѝ в променлива от тип int.',
   fact:'Това е int в C++ — цяло число, без запетая.',
   codeLines:['int vazrast_luna = {{b1}};'], blanks:[{id:'b1',kind:'number',correct:2}],
   resultCountId:'b1', resultEmoji:'🐾', successMsg:'Точно така — Луна е на 2 годинки! 🐱',
   sequel:{story:'Изминава година — днес е рожденият ден на Луна! Тя навършва 3 годинки. Обнови променливата.',
     codeLines:['int vazrast_luna = {{b1}};'], blanks:[{id:'b1',kind:'number',correct:3}],
     resultCountId:'b1', resultEmoji:'🎂', successMsg:'Честит рожден ден, Луна — вече си на 3! 🎉'}},
  {title:'Какъв тип е Бо', type:'blanks',
   story:'Всяка стойност за кученцето Бо си има тип. Избери верния тип пред всяка променлива.',
   fact:'int, string и bool са най-често срещаните типове данни в C++.',
   codeLines:['{{b1}} godini = 5;','{{b2}} ime = "Бо";','{{b3}} gladen = true;'],
   blanks:[
     {id:'b1',kind:'select',options:[{value:'int',label:'int'},{value:'string',label:'string'},{value:'bool',label:'bool'}],correct:'int'},
     {id:'b2',kind:'select',options:[{value:'int',label:'int'},{value:'string',label:'string'},{value:'bool',label:'bool'}],correct:'string'},
     {id:'b3',kind:'select',options:[{value:'int',label:'int'},{value:'string',label:'string'},{value:'bool',label:'bool'}],correct:'bool'}
   ], successMsg:'Отлично! Позна всички типове данни! 🐶',
   sequel:{story:'Мия осинови ново коте! Направи същия анализ за него — брой играчки, любимо занимание и дали е палаво.',
     codeLines:['{{b1}} broi_igrachki = 7;','{{b2}} zanimanie = "тичане";','{{b3}} e_pakostlivo = true;'],
     blanks:[
       {id:'b1',kind:'select',options:[{value:'int',label:'int'},{value:'string',label:'string'},{value:'bool',label:'bool'}],correct:'int'},
       {id:'b2',kind:'select',options:[{value:'int',label:'int'},{value:'string',label:'string'},{value:'bool',label:'bool'}],correct:'string'},
       {id:'b3',kind:'select',options:[{value:'int',label:'int'},{value:'string',label:'string'},{value:'bool',label:'bool'}],correct:'bool'}
     ], successMsg:'Новото коте вече си има точни данни! 🐈✨'}},
  {title:'Мия се представя', type:'order',
   story:'Мия иска първо да се представи по име, а после да каже възрастта си. Подреди редовете правилно.',
   fact:'cout << извежда текст на екрана — точно както в първите програми на петокласниците.',
   chips:[{id:'a',label:'cout << "Здравей, аз съм Мия!";'},{id:'b',label:'cout << "На 8 години съм.";'}],
   correctOrder:['a','b'], successMsg:'Мия се представи чудесно! 👋',
   sequel:{story:'Мия среща нова приятелка на бала и иска да добави още нещо за себе си — първо какво обича да прави, после защо ѝ харесва.',
     chips:[{id:'a',label:'cout << "Обичам да танцувам!";'},{id:'b',label:'cout << "Танцът ме прави щастлива.";'}],
     correctOrder:['a','b'], successMsg:'Новата приятелка на Мия е впечатлена! 💃'}},
  {title:'Бисквитките на Бо', type:'blanks',
   story:'Бо получи 3 бисквитки сутрин и 4 вечерта. Избери оператора, за да пресметнеш общо колко бисквитки е изял.',
   fact:'+ , - , * , / са аритметичните оператори в C++.',
   codeLines:['int biskviti = 3 {{b1}} 4;'],
   blanks:[{id:'b1',kind:'select',options:[{value:'+',label:'+'},{value:'-',label:'-'},{value:'*',label:'*'},{value:'/',label:'/'}],correct:'+'}],
   successMsg:'Точно — общо 7 бисквитки! 🦴',
   sequel:{story:'На разходка Бо изяде 5 бисквитки, а вкъщи получи още 2. Кой оператор ти трябва пак?',
     codeLines:['int biskviti = 5 {{b1}} 2;'],
     blanks:[{id:'b1',kind:'select',options:[{value:'+',label:'+'},{value:'-',label:'-'},{value:'*',label:'*'},{value:'/',label:'/'}],correct:'+'}],
     successMsg:'Пак 7 — но с нови числа този път! 🦴'}},
  {title:'Роклите на Мия', type:'blanks',
   story:'Мия има 2 чанти по 3 рокли във всяка, плюс още 1 отделна рокля. Кое пресмятане е вярно?',
   fact:'В C++ умножението и делението се изпълняват преди събиране и изваждане.',
   codeLines:['int rokli = {{b1}};'],
   blanks:[{id:'b1',kind:'select',options:[{value:'a',label:'(2 * 3) + 1 = 7'},{value:'b',label:'2 * (3 + 1) = 8'}],correct:'a'}],
   successMsg:'Вярно, Мия има 7 рокли общо! 👗',
   sequel:{story:'Мия опакова багажа: 3 кутии с по 4 играчки във всяка, плюс 2 отделни играчки. Кое пресмятане е вярно сега?',
     codeLines:['int igrachki = {{b1}};'],
     blanks:[{id:'b1',kind:'select',options:[{value:'a',label:'(3 * 4) + 2 = 14'},{value:'b',label:'3 * (4 + 2) = 18'}],correct:'a'}],
     successMsg:'Точно — 14 играчки в багажа! 🧸'}},
  {title:'Кой пази къщата', type:'blanks',
   story:'Бо е на 4 години, Луна е на 2. Избери оператора, така че условието да е вярно и Бо да пази къщата, защото е по-голям.',
   fact:'>, <, ==, >= са операторите за сравнение в C++.',
   codeLines:['if (vazrast_bo {{b1}} vazrast_luna) {','  cout << "Бо пази къщата";','}'],
   blanks:[{id:'b1',kind:'select',options:[{value:'>',label:'>'},{value:'<',label:'<'},{value:'==',label:'=='},{value:'>=',label:'>='}],correct:'>'}],
   successMsg:'Точно! 4 > 2, Бо пази къщата! 🐶🏠',
   sequel:{story:'Времето мина — сега Луна е на 5 години, а Бо е на 4. Ролите се обръщат! Кой оператор доказва, че сега Луна е по-голямата?',
     codeLines:['if (vazrast_luna {{b1}} vazrast_bo) {','  cout << "Луна пази къщата";','}'],
     blanks:[{id:'b1',kind:'select',options:[{value:'>',label:'>'},{value:'<',label:'<'},{value:'==',label:'=='},{value:'>=',label:'>='}],correct:'>'}],
     successMsg:'5 > 4 — сега Луна пази къщата! 🐈🏠'}},
  {title:'Голямата кошница', type:'blanks',
   story:'Бо е бил 25 см, а е пораснал с още 5 см. Колко е ръстът му сега? (Над 25 см се слага в голямата кошница.)',
   fact:'Условието if проверява дали нещо е вярно, преди да изпълни код.',
   codeLines:['int rastezh_bo = {{b1}};','if (rastezh_bo > 25) {','  cout << "Голяма кошница";','}'],
   blanks:[{id:'b1',kind:'number',correct:30}], successMsg:'Бо вече е 30 см и получава голямата кошница! 🧺',
   sequel:{story:'Бо продължава да расте! Беше 30 см, а порасна с още 2 см. Колко е сега?',
     codeLines:['int rastezh_bo = {{b1}};','if (rastezh_bo > 25) {','  cout << "Голяма кошница";','}'],
     blanks:[{id:'b1',kind:'number',correct:32}], successMsg:'Бо вече е 32 см — истинско голямо куче! 🐕'}},
  {title:'Подарък за Мия', type:'blanks',
   story:'Днес имаш подарък за Мия! Задай стойността, така че тя да се зарадва.',
   fact:'else изпълнява различен код, когато условието е невярно.',
   codeLines:['bool ima_podarak = {{b1}};','if (ima_podarak) {','  cout << "Мия се радва!";','} else {','  cout << "Мия е тъжна.";','}'],
   blanks:[{id:'b1',kind:'select',options:YN,correct:'true'}], successMsg:'Мия грейна от щастие! 🎁💕',
   sequel:{story:'Днес забрави подаръка вкъщи. Задай стойността, така че кодът да мине през клона else.',
     codeLines:['bool ima_podarak = {{b1}};','if (ima_podarak) {','  cout << "Мия се радва!";','} else {','  cout << "Мия е тъжна.";','}'],
     blanks:[{id:'b1',kind:'select',options:YN,correct:'false'}], successMsg:'Видя ли клона else? Утре ще донесеш подаръка! 💌'}},
  {title:'Колко голяма е Луна', type:'blanks',
   story:'Луна е 25 см — това е между 20 и 30 см. Кой етикет пасва на този клон от условието?',
   fact:'else if позволява да провериш няколко условия едно след друго.',
   codeLines:['int rast = 25;','if (rast < 20) { etiket = "коте"; }','else if (rast < 30) { etiket = {{b1}}; }','else { etiket = "голяма котка"; }'],
   blanks:[{id:'b1',kind:'select',options:[{value:'"коте"',label:'"коте"'},{value:'"котка"',label:'"котка"'},{value:'"голяма котка"',label:'"голяма котка"'}],correct:'"котка"'}],
   successMsg:'Точно — Луна е „котка“! 🐈',
   sequel:{story:'Луна порасна до 32 см — над третата граница. Този път блокът е последен, без else if. Попълни клона else.',
     codeLines:['int rast = 32;','if (rast < 20) { etiket = "коте"; }','else if (rast < 30) { etiket = "котка"; }','else { etiket = {{b1}}; }'],
     blanks:[{id:'b1',kind:'select',options:[{value:'"коте"',label:'"коте"'},{value:'"котка"',label:'"котка"'},{value:'"голяма котка"',label:'"голяма котка"'}],correct:'"голяма котка"'}],
     successMsg:'Луна вече е „голяма котка“! 🐈‍⬛'}},
  {title:'Отключи роклята за бала', type:'blanks',
   story:'Роклята за бала се отключва само ако Мия е ИЗМИТА И СРЕСАНА. Днес е направила и двете — задай стойностите.',
   fact:'&& (И) е вярно само когато ДВЕТЕ условия са верни.',
   codeLines:['bool izmita = {{b1}};','bool sresana = {{b2}};','if (izmita && sresana) {','  cout << "Роклята се отключи!";','} else {','  cout << "Още не, трябва и двете!";','}'],
   blanks:[{id:'b1',kind:'select',options:YN,correct:'true'},{id:'b2',kind:'select',options:YN,correct:'true'}],
   successMsg:'И двете са верни — роклята се отключи! 👗🔓',
   sequel:{story:'Днес Мия е сресана, но избърза и НЕ се изми. Задай стойностите така, че историята да мине по клона else.',
     codeLines:['bool izmita = {{b1}};','bool sresana = {{b2}};','if (izmita && sresana) {','  cout << "Роклята се отключи!";','} else {','  cout << "Още не, трябва и двете!";','}'],
     blanks:[{id:'b1',kind:'select',options:YN,correct:'false'},{id:'b2',kind:'select',options:YN,correct:'true'}],
     successMsg:'Точно — трябват и двете! Мия хуква да се измие. 🛁'}},
  {title:'Бисквитка за трика', type:'blanks',
   story:'Бо не е бил послушен днес, но направи страхотен трик! С ИЛИ (||) стига поне едно от двете. Задай стойността.',
   fact:'|| (ИЛИ) е вярно, когато поне ЕДНО условие е вярно.',
   codeLines:['bool poslushen = false;','bool napravi_trik = {{b1}};','if (poslushen || napravi_trik) {','  cout << "Бо получава бисквитка!";','}'],
   blanks:[{id:'b1',kind:'select',options:YN,correct:'true'}], successMsg:'Трикът стигна! Бо получава бисквитка! 🍪',
   sequel:{story:'Днес Бо е послушен през целия ден, но не направи никакъв трик. Задай стойността — с ИЛИ пак стига само едно от двете.',
     codeLines:['bool poslushen = true;','bool napravi_trik = {{b1}};','if (poslushen || napravi_trik) {','  cout << "Бо получава бисквитка!";','}'],
     blanks:[{id:'b1',kind:'select',options:YN,correct:'false'}], successMsg:'Послушанието стигна! Бо пак получава бисквитка! 🍪'}},
  {title:'Гладен ли е Бо', type:'blanks',
   story:'Бо пропусна закуската си тази сутрин. Гладен ли е? Задай bool стойността.',
   fact:'bool пази само две стойности — true (вярно) или false (невярно).',
   codeLines:['bool gladen_bo = {{b1}};','if (gladen_bo) {','  cout << "Бо лае за храна";','} else {','  cout << "Бо е сит и спокоен";','}'],
   blanks:[{id:'b1',kind:'select',options:YN,correct:'true'}], successMsg:'Да, Бо е гладен и лае за храна! 🍗',
   sequel:{story:'Този път Бо закуси добре. Задай стойността, така че историята да мине по клона else.',
     codeLines:['bool gladen_bo = {{b1}};','if (gladen_bo) {','  cout << "Бо лае за храна";','} else {','  cout << "Бо е сит и спокоен";','}'],
     blanks:[{id:'b1',kind:'select',options:YN,correct:'false'}], successMsg:'Бо е сит и си дреме на слънце. 😴'}},
  {title:'Нахрани всички котенца', type:'blanks',
   story:'Имаш 5 гладни котенца. Колко пъти трябва да се повтори цикълът, за да нахраниш всяко от тях по веднъж?',
   fact:'Цикълът for повтаря код точно определен брой пъти.',
   codeLines:['for (int i = 0; i < {{b1}}; i++) {','  cout << "Нахрани коте " << i;','}'],
   blanks:[{id:'b1',kind:'number',correct:5}], resultCountId:'b1', resultEmoji:'🐱',
   successMsg:'Всичките 5 котенца са нахранени! 🥣',
   sequel:{story:'Пристигнаха още 2 котенца от съседите! Сега общо са 7. Обнови цикъла.',
     codeLines:['for (int i = 0; i < {{b1}}; i++) {','  cout << "Нахрани коте " << i;','}'],
     blanks:[{id:'b1',kind:'number',correct:7}], resultCountId:'b1', resultEmoji:'🐱',
     successMsg:'Всичките 7 котенца са сити! 🥣🥣'}},
  {title:'Всяка втора кукла', type:'blanks',
   story:'Искаш да облечеш само всяка ВТОРА кукла от 6-те (0, 2, 4). Каква трябва да е стъпката на цикъла?',
   fact:'С i += 2 циклите могат да прескачат стойности.',
   codeLines:['for (int i = 0; i < 6; i += {{b1}}) {','  cout << "Нова рокля на кукла " << i;','}'],
   blanks:[{id:'b1',kind:'number',correct:2}], successMsg:'Точно — куклите 0, 2 и 4 са с нови рокли! 👗👗👗',
   sequel:{story:'Колекцията порасна на 9 кукли. Сега искаш да облечеш само всяка ТРЕТА (0, 3, 6). Каква е стъпката?',
     codeLines:['for (int i = 0; i < 9; i += {{b1}}) {','  cout << "Нова рокля на кукла " << i;','}'],
     blanks:[{id:'b1',kind:'number',correct:3}], successMsg:'Куклите 0, 3 и 6 блестят с нови рокли! 👗✨'}},
  {title:'Купичката на Бо', type:'blanks',
   story:'Купичката на Бо се пълни, докато не стигне 4 чаши вода. С колко трябва да сравняваме chashi?',
   fact:'Цикълът while се повтаря, докато условието е вярно.',
   codeLines:['int chashi = 0;','while (chashi < {{b1}}) {','  chashi = chashi + 1;','}'],
   blanks:[{id:'b1',kind:'number',correct:4}], resultCountId:'b1', resultEmoji:'💧',
   successMsg:'Купичката е пълна с 4 чаши вода! 💧🐶',
   sequel:{story:'Днес е горещо и Бо получи по-голяма купичка — тя трябва да стигне 6 чаши.',
     codeLines:['int chashi = 0;','while (chashi < {{b1}}) {','  chashi = chashi + 1;','}'],
     blanks:[{id:'b1',kind:'number',correct:6}], resultCountId:'b1', resultEmoji:'💧',
     successMsg:'Голямата купичка е пълна с 6 чаши вода! 💧💧'}},
  {title:'Луна спира навреме', type:'blanks',
   story:'Чинията побира 5 хапки, но Луна винаги спира точно след 3-тата. На кое число трябва да сработи break?',
   fact:'break спира цикъла предсрочно, дори да не е свършил.',
   codeLines:['for (int i = 0; i < 5; i++) {','  if (i == {{b1}}) { break; }','  cout << "Хапка " << i;','}'],
   blanks:[{id:'b1',kind:'number',correct:3}], successMsg:'Луна спря точно навреме — на 3-тата хапка! 🍽️',
   sequel:{story:'Днес чинията побира 6 хапки, а Луна е по-гладна и спира чак след 4-тата.',
     codeLines:['for (int i = 0; i < 6; i++) {','  if (i == {{b1}}) { break; }','  cout << "Хапка " << i;','}'],
     blanks:[{id:'b1',kind:'number',correct:4}], successMsg:'Луна спря на 4-тата хапка — расте! 🍽️😺'}},
  {title:'Рафтове с чантички', type:'blanks',
   story:'Имаш 3 рафта, а на всеки рафт слагаш по 4 чантички. Попълни броя на рафтовете и чантичките в двата цикъла.',
   fact:'Вложен цикъл (цикъл в цикъл) обхожда редове и колони — точно като таблица.',
   codeLines:['for (int raft = 0; raft < {{b1}}; raft++) {','  for (int chanta = 0; chanta < {{b2}}; chanta++) {','    cout << "Чантичка на рафт " << raft;','  }','}'],
   blanks:[{id:'b1',kind:'number',correct:3},{id:'b2',kind:'number',correct:4}], successMsg:'12 чантички, подредени перфектно на 3 рафта! 👜',
   sequel:{story:'Купи нов шкаф — 4 рафта с по 3 чантички на всеки. Попълни новите числа.',
     codeLines:['for (int raft = 0; raft < {{b1}}; raft++) {','  for (int chanta = 0; chanta < {{b2}}; chanta++) {','    cout << "Чантичка на рафт " << raft;','  }','}'],
     blanks:[{id:'b1',kind:'number',correct:4},{id:'b2',kind:'number',correct:3}], successMsg:'Пак 12 чантички, но подредени по нов начин! 👜✨'}},
  {title:'Кое котенце е на индекс 1', type:'blanks',
   story:'Масивът пази 3 имена, номерирани от 0. kotenca[1] сочи към елемента на индекс 1. Коя котка е това?',
   fact:'Масивите пазят няколко стойности заедно, номерирани от 0.',
   codeLines:['string kotenca[3] = {"Луна", "Мечо", "Симба"};','cout << kotenca[1];','// отговор: {{b1}}'],
   blanks:[{id:'b1',kind:'select',options:[{value:'Луна',label:'Луна (индекс 0)'},{value:'Мечо',label:'Мечо (индекс 1)'},{value:'Симба',label:'Симба (индекс 2)'}],correct:'Мечо'}],
   successMsg:'Точно, kotenca[1] е Мечо! 🐈',
   sequel:{story:'Масивът се пренареди по нов ред: {"Симба", "Луна", "Мечо"}. Този път коя котка е на индекс 2?',
     codeLines:['string kotenca[3] = {"Симба", "Луна", "Мечо"};','cout << kotenca[2];','// отговор: {{b1}}'],
     blanks:[{id:'b1',kind:'select',options:[{value:'Симба',label:'Симба (индекс 0)'},{value:'Луна',label:'Луна (индекс 1)'},{value:'Мечо',label:'Мечо (индекс 2)'}],correct:'Мечо'}],
     successMsg:'Точно — редът в масива се промени, но идеята е същата! 🐈'}},
  {title:'Общо бисквитки за кученцата', type:'blanks',
   story:'Цикълът обхожда масива и събира всички бисквитки: 2 + 3 + 1 + 4. Каква е крайната стойност на obshto?',
   fact:'Цикъл по масив обхожда всеки елемент един по един.',
   codeLines:['int biskviti[4] = {2, 3, 1, 4};','int obshto = 0;','for (int i = 0; i < 4; i++) {','  obshto = obshto + biskviti[i];','}','// obshto = {{b1}}'],
   blanks:[{id:'b1',kind:'number',correct:10}], resultCountId:'b1', resultEmoji:'🍪',
   successMsg:'Общо 10 бисквитки за четирите кученца! 🦴',
   sequel:{story:'Днес разпределението е различно: {3, 1, 2, 5}. Каква е новата обща сума?',
     codeLines:['int biskviti[4] = {3, 1, 2, 5};','int obshto = 0;','for (int i = 0; i < 4; i++) {','  obshto = obshto + biskviti[i];','}','// obshto = {{b1}}'],
     blanks:[{id:'b1',kind:'number',correct:11}], resultCountId:'b1', resultEmoji:'🍪',
     successMsg:'Общо 11 бисквитки този път! 🦴🦴'}},
  {title:'Пълното име на Мия', type:'blanks',
   story:'За да се получи „Мия Кроткова“ с интервал между името и фамилията, кое трябва да съединим по средата?',
   fact:'+ съединява (конкатенира) низове в C++.',
   codeLines:['string ime_pulno = "Мия" + {{b1}} + "Кроткова";'],
   blanks:[{id:'b1',kind:'select',options:[{value:'space',label:'" " (интервал)'},{value:'empty',label:'"" (нищо)'},{value:'dash',label:'"-"'}],correct:'space'}],
   successMsg:'Готово — „Мия Кроткова“! ✨',
   sequel:{story:'Луна също получава галено име: „Луна“ + галено „Пухчо“, съединени с интервал.',
     codeLines:['string galeno_ime = "Луна" + {{b1}} + "Пухчо";'],
     blanks:[{id:'b1',kind:'select',options:[{value:'space',label:'" " (интервал)'},{value:'empty',label:'"" (нищо)'},{value:'dash',label:'"-"'}],correct:'space'}],
     successMsg:'„Луна Пухчо“ — прекрасно галено име! 🐾'}},
  {title:'Дължината на името Бо', type:'blanks',
   story:'Колко букви (символа) има думата „Бо“?',
   fact:'length() показва колко символа има един низ.',
   codeLines:['string ime = "Бо";','cout << ime.length();','// дължина = {{b1}}'],
   blanks:[{id:'b1',kind:'number',correct:2}], successMsg:'Точно 2 букви! 🔤',
   sequel:{story:'А колко букви има думата „Мия“?',
     codeLines:['string ime = "Мия";','cout << ime.length();','// дължина = {{b1}}'],
     blanks:[{id:'b1',kind:'number',correct:3}], successMsg:'Точно 3 букви! 🔤✨'}},
  {title:'Размяна на панделките', type:'blanks',
   story:'За да размениш панделките на Бо и Макс, първо запази панделката на Бо в temp, после дай на Бо панделката на Макс.',
   fact:'Разменянето на две стойности изисква трета, временна променлива.',
   codeLines:['string panelka_bo = "червена";','string panelka_max = "синя";','string temp = {{b1}};','panelka_bo = {{b2}};','panelka_max = temp;'],
   blanks:[
     {id:'b1',kind:'select',options:[{value:'panelka_bo',label:'panelka_bo'},{value:'panelka_max',label:'panelka_max'}],correct:'panelka_bo'},
     {id:'b2',kind:'select',options:[{value:'panelka_bo',label:'panelka_bo'},{value:'panelka_max',label:'panelka_max'}],correct:'panelka_max'}
   ], successMsg:'Панделките са разменени успешно! 🎀',
   sequel:{story:'Сега размени играчките на Бо и Макс — истинско затвърждаване с нови имена на променливите.',
     codeLines:['string igrachka_bo = "топка";','string igrachka_max = "въже";','string temp = {{b1}};','igrachka_bo = {{b2}};','igrachka_max = temp;'],
     blanks:[
       {id:'b1',kind:'select',options:[{value:'igrachka_bo',label:'igrachka_bo'},{value:'igrachka_max',label:'igrachka_max'}],correct:'igrachka_bo'},
       {id:'b2',kind:'select',options:[{value:'igrachka_bo',label:'igrachka_bo'},{value:'igrachka_max',label:'igrachka_max'}],correct:'igrachka_max'}
     ], successMsg:'Играчките са разменени — Бо тича с въжето! 🎾'}},
  {title:'Извикай функцията resheshi', type:'blanks',
   story:'Извикай функцията, като ѝ подадеш името на Луна като текст (низ).',
   fact:'Функциите са именувани блокове код, които извикваш с () — тук с параметър.',
   codeLines:['void resheshi(string kotka) {','  cout << kotka << " е срешана!";','}','resheshi({{b1}});'],
   blanks:[{id:'b1',kind:'select',options:[{value:'"Луна"',label:'"Луна"'},{value:'Луна',label:'Луна (без кавички)'},{value:'luna',label:'luna'}],correct:'"Луна"'}],
   successMsg:'Луна е срешана и лъщи! 💇🐱',
   sequel:{story:'Сега е ред на Бо да получи същата грижа — извикай функцията с неговото име.',
     codeLines:['void resheshi(string zhivotno) {','  cout << zhivotno << " е срешан!";','}','resheshi({{b1}});'],
     blanks:[{id:'b1',kind:'select',options:[{value:'"Бо"',label:'"Бо"'},{value:'Бо',label:'Бо (без кавички)'},{value:'bo',label:'bo'}],correct:'"Бо"'}],
     successMsg:'Бо е срешан и лъщи като звезда! 💇🐶'}},
  {title:'Функция за общо бисквитки', type:'blanks',
   story:'Функцията трябва да върне общия брой бисквитки — сутрешните плюс вечерните. Кой оператор ѝ трябва?',
   fact:'return връща резултат от функцията обратно навън.',
   codeLines:['int obshto(int sutrin, int vecher) {','  return sutrin {{b1}} vecher;','}','cout << obshto(3, 4);'],
   blanks:[{id:'b1',kind:'select',options:[{value:'+',label:'+'},{value:'-',label:'-'}],correct:'+'}],
   successMsg:'Функцията връща 7 — точно като преди! 🔁',
   sequel:{story:'Днес Бо изяде 5 сутрин и 2 вечер. Извикай пак функцията с новите числа.',
     codeLines:['int obshto(int sutrin, int vecher) {','  return sutrin {{b1}} vecher;','}','cout << obshto(5, 2);'],
     blanks:[{id:'b1',kind:'select',options:[{value:'+',label:'+'},{value:'-',label:'-'}],correct:'+'}],
     successMsg:'Функцията върна 7, но с нови числа! 🔁🦴'}},
  {title:'Кои кученца са високи', type:'blanks',
   story:'Провери всяко кученце от списъка [20, 30, 25, 28, 22] см. Колко от тях са с ръст НАД 25 см?',
   fact:'Брояч (i++) добавя 1 всеки път, когато условие е вярно.',
   codeLines:['int rastezhi[5] = {20, 30, 25, 28, 22};','int broi = 0;','for (int i = 0; i < 5; i++) {','  if (rastezhi[i] > 25) { broi = broi + 1; }','}','// broi = {{b1}}'],
   blanks:[{id:'b1',kind:'number',correct:2}], successMsg:'Точно 2 кученца са над 25 см! 📏',
   sequel:{story:'Дойде нова група кученца: [18, 32, 26, 24, 29] см. Колко от тях са над 25 см сега?',
     codeLines:['int rastezhi[5] = {18, 32, 26, 24, 29};','int broi = 0;','for (int i = 0; i < 5; i++) {','  if (rastezhi[i] > 25) { broi = broi + 1; }','}','// broi = {{b1}}'],
     blanks:[{id:'b1',kind:'number',correct:3}], successMsg:'Този път 3 кученца са над 25 см! 📏🐕'}},
  {title:'Намери оранжевата рокля', type:'blanks',
   story:'Броенето на масивите започва от 0. На кой индекс се намира „Оранжева“?',
   fact:'Линейно търсене проверява всеки елемент, докато намери търсеното.',
   codeLines:['string rokli[4] = {"Синя", "Розова", "Оранжева", "Зелена"};','// на кой индекс е "Оранжева"?','// индекс = {{b1}}'],
   blanks:[{id:'b1',kind:'number',correct:2}], successMsg:'Индекс 2 — намери я! 🔍👗',
   sequel:{story:'Гардеробът се пренареди: {"Розова", "Зелена", "Оранжева", "Синя"}. На кой индекс е „Зелена“ сега?',
     codeLines:['string rokli[4] = {"Розова", "Зелена", "Оранжева", "Синя"};','// на кой индекс е "Зелена"?','// индекс = {{b1}}'],
     blanks:[{id:'b1',kind:'number',correct:1}], successMsg:'Индекс 1 — намери я отново! 🔍💚'}},
  {title:'Подреди котенцата по възраст', type:'blanks',
   story:'При сортиране сравняваме съседни числа — ако лявото е по-голямо, ги разменяме. Провери двете съседни двойки.',
   fact:'Сортирането подрежда елементи, като сравнява и разменя съседни.',
   codeLines:['int kotenca[3] = {2, 5, 3};','// стъпка 1: сравни 2 и 5. Размяна? {{b1}}','// стъпка 2: сравни 5 и 3. Размяна? {{b2}}'],
   blanks:[
     {id:'b1',kind:'select',options:[{value:'da',label:'Да'},{value:'ne',label:'Не'}],correct:'ne'},
     {id:'b2',kind:'select',options:[{value:'da',label:'Да'},{value:'ne',label:'Не'}],correct:'da'}
   ], successMsg:'Точно! След стъпките котенцата са по-подредени: 2, 3, 5. 📊',
   sequel:{story:'Нов ред за сортиране: {4, 2, 5}. Провери същите две съседни двойки за тази подредба.',
     codeLines:['int kotenca[3] = {4, 2, 5};','// стъпка 1: сравни 4 и 2. Размяна? {{b1}}','// стъпка 2: сравни 4 и 5. Размяна? {{b2}}'],
     blanks:[
       {id:'b1',kind:'select',options:[{value:'da',label:'Да'},{value:'ne',label:'Не'}],correct:'da'},
       {id:'b2',kind:'select',options:[{value:'da',label:'Да'},{value:'ne',label:'Не'}],correct:'ne'}
     ], successMsg:'Точно! Редицата стана: 2, 4, 5. 📊🐈'}},
  {title:'Намери грешката', type:'blanks',
   story:'Тази програма трябва да нахрани Бо 3 пъти, но има грешка в условието на цикъла. Намери и поправи оператора.',
   fact:'Дори опитни програмисти правят малки грешки — намирането им се нарича дебъгване.',
   codeLines:['for (int i = 0; i {{b1}} 3; i++) {','  cout << "Нахрани Бо " << i;','}'],
   blanks:[{id:'b1',kind:'select',options:[{value:'<',label:'<'},{value:'>',label:'>'},{value:'==',label:'=='}],correct:'<'}],
   successMsg:'Грешката е оправена — Бо е нахранен точно 3 пъти! 🐛✅',
   sequel:{story:'Сега подобна грешка се промъкна в програмата за Луна — но тя трябва да получи 4 хапки.',
     codeLines:['for (int i = 0; i {{b1}} 4; i++) {','  cout << "Нахрани Луна " << i;','}'],
     blanks:[{id:'b1',kind:'select',options:[{value:'<',label:'<'},{value:'>',label:'>'},{value:'==',label:'=='}],correct:'<'}],
     successMsg:'И тази грешка е оправена — Луна получи точно 4 хапки! 🐛✅'}},
  {title:'Финал: приказният магазин', type:'blanks',
   story:'Вече имаш 4 играчки в приказния магазин. Колко още трябва да добавиш с цикъла, за да стигнеш поне 10?',
   fact:'Точно тук — променливи, цикли и условия заедно — работят истинските програми!',
   codeLines:['int igrachki = {{b1}};','for (int i = 0; i < {{b2}}; i++) {','  igrachki = igrachki + 1;','}','if (igrachki >= 10) {','  cout << "Магазинът е готов за откриване!";','}'],
   blanks:[{id:'b1',kind:'number',correct:4},{id:'b2',kind:'number',correct:6}],
   successMsg:'🎉 Магазинът е готов за откриване! 30 урока завършени!',
   sequel:{story:'Магазинът е толкова успешен, че решаваш да отвориш втори щанд! Вече имаш 6 играчки — колко още трябват до 10?',
     codeLines:['int igrachki = {{b1}};','for (int i = 0; i < {{b2}}; i++) {','  igrachki = igrachki + 1;','}','if (igrachki >= 10) {','  cout << "Вторият щанд е готов!";','}'],
     blanks:[{id:'b1',kind:'number',correct:6},{id:'b2',kind:'number',correct:4}],
     successMsg:'🎉 И вторият щанд отваря врати! Луна, Бо и Мия празнуват заедно с теб!'}},

  {title:'Класове — плановете за играчки', type:'blanks',
   story:'Клас е като план (шаблон) за играчка — например план за „Куче“. От него правим много различни кученца (обекти). Попълни какво трябва да пази планът — свойство, не стойност.',
   fact:'В C++, C# или Go класовете/структурите описват какви свойства и действия има един обект.',
   codeLines:['class Kuche {','  string {{b1}};','  int vazrast;','}'],
   blanks:[{id:'b1',kind:'select',options:[{value:'ime',label:'ime'},{value:'"Бо"',label:'"Бо" (стойност, не свойство)'},{value:'5',label:'5 (число, не свойство)'}],correct:'ime'}],
   successMsg:'Точно — планът за „Куче“ пази име и възраст! 🐾',
   sequel:{story:'Сега направи подобен план, но за клас „Kotka“ — той също трябва да пази име.',
     codeLines:['class Kotka {','  string {{b1}};','  int godini;','}'],
     blanks:[{id:'b1',kind:'select',options:[{value:'ime',label:'ime'},{value:'"Луна"',label:'"Луна" (стойност, не свойство)'},{value:'2',label:'2 (число, не свойство)'}],correct:'ime'}],
     successMsg:'Планът за „Kotka“ е готов — пази име и години! 🐱'}},
  {title:'Обекти от класа', type:'blanks',
   story:'От плана „Куче“ създаваме истинско куче на име Бо, на 3 години — това е обект.',
   fact:'Един клас може да създаде много различни обекти — всеки със свои собствени стойности.',
   codeLines:['Kuche bo;','bo.ime = {{b1}};','bo.vazrast = {{b2}};'],
   blanks:[{id:'b1',kind:'select',options:[{value:'"Бо"',label:'"Бо"'},{value:'Бо',label:'Бо (без кавички)'}],correct:'"Бо"'},{id:'b2',kind:'number',correct:3}],
   successMsg:'Готово! Бо е истински обект от клас „Куче“. 🐶',
   sequel:{story:'От плана „Kotka“ създай обект за Луна — тя е на 3 годинки.',
     codeLines:['Kotka luna;','luna.ime = {{b1}};','luna.godini = {{b2}};'],
     blanks:[{id:'b1',kind:'select',options:[{value:'"Луна"',label:'"Луна"'},{value:'Луна',label:'Луна (без кавички)'}],correct:'"Луна"'},{id:'b2',kind:'number',correct:3}],
     successMsg:'Луна вече е истински обект от клас „Kotka“! 🐱'}},
  {title:'Методи — действията на обекта', type:'blanks',
   story:'Методът е действие, което обектът може да прави — например да лае.',
   fact:'Методите са функции, които принадлежат на обекта и могат да ползват неговите свойства.',
   codeLines:['class Kuche {','  string ime;','  void {{b1}}() {','    cout << ime << " лае!";','  }','}','bo.{{b1}}();'],
   blanks:[{id:'b1',kind:'select',options:[{value:'lai',label:'lai'},{value:'ime',label:'ime'},{value:'5',label:'5'}],correct:'lai'}],
   successMsg:'Бо казва: Джаф-джаф! 🐕',
   sequel:{story:'Сега добави метод и за „Kotka“ — тя мяука, а не лае.',
     codeLines:['class Kotka {','  string ime;','  void {{b1}}() {','    cout << ime << " мяука!";','  }','}','luna.{{b1}}();'],
     blanks:[{id:'b1',kind:'select',options:[{value:'myau',label:'myau'},{value:'ime',label:'ime'},{value:'2',label:'2'}],correct:'myau'}],
     successMsg:'Луна казва: Мяу-мяу! 🐱'}},
  {title:'Какво следва: истински светове', type:'info',
   story:'Точно това, което научи — класове и обекти със свойства и методи — е сърцето на много истински технологии.',
   fact:'Свойствата и методите, които научи тук, работят по абсолютно същия начин и в по-големите езици за програмиране.',
   infoBody:[
     '🎮 В Unity (най-популярният инструмент за създаване на игри) всеки герой, врата или предмет е "GameObject" с компоненти — точно като обект от клас с ime, vazrast и методи. Игрите се пишат на C#.',
     '🌐 В .NET и C# компаниите строят сайтове и приложения, използвайки същите класове и обекти.',
     '⚙️ Go (Golang) използва "структури" (structs) — леко различна дума, но същата идея: групираш данни заедно и пишеш функции, които работят с тях.'
   ],
   successMsg:'Ти вече разбираш идея, върху която са построени игри, сайтове и приложения! 🚀'},

  {title:'Оживи Мия с код', type:'live',
   story:'Мия иска да оживее! Напиши цикъл, който я движи надясно, докато стигне звездата. Опитай числа, изпълни кода и виж какво се случва.',
   fact:'move(посока) премества героя с една стъпка. for (int i = 0; i < N; i++) { move(...); } повтаря движението N пъти.',
   grid:{rows:1, cols:6, start:[0,0], goal:[0,5], walls:[]},
   codeLines:['for (int i = 0; i < {{b1}}; i++) {','  move(right);','}'],
   blanks:[{id:'b1',kind:'number'}],
   compile:(v)=>[{dir:'right', count: parseInt(v.b1,10)||0}],
   successMsg:'Мия оживя и стигна звездата с твоя код! 🌟🏃‍♀️'},

  {title:'Завий с код', type:'live',
   story:'Сега Мия трябва да завие. Напиши два цикъла — един за нагоре, един за надясно — за да стигне звездата.',
   fact:'Можеш да наредиш няколко цикъла един след друг — героят изпълнява първия, после втория.',
   grid:{rows:4, cols:4, start:[3,0], goal:[0,3], walls:[]},
   codeLines:['for (int i = 0; i < {{b1}}; i++) { move(up); }','for (int i = 0; i < {{b2}}; i++) { move(right); }'],
   blanks:[{id:'b1',kind:'number'},{id:'b2',kind:'number'}],
   compile:(v)=>[{dir:'up', count: parseInt(v.b1,10)||0},{dir:'right', count: parseInt(v.b2,10)||0}],
   successMsg:'Перфектен завой — Мия стигна звездата! 🌟↗️'},

  {title:'Избери посоката', type:'live',
   story:'Този път сама избираш и посоката, и броя стъпки за всеки цикъл — построй пътя, който заобикаля камъните.',
   fact:'Параметър в кода (тук — посоката) прави кода гъвкав — един и същ цикъл може да мести героя в различни посоки.',
   grid:{rows:4, cols:4, start:[3,0], goal:[0,3], walls:[[3,1],[2,1],[1,2]]},
   codeLines:['for (int i = 0; i < {{c1}}; i++) { move({{d1}}); }','for (int i = 0; i < {{c2}}; i++) { move({{d2}}); }'],
   blanks:[
     {id:'c1',kind:'number'},{id:'d1',kind:'select',options:DIR_OPTIONS},
     {id:'c2',kind:'number'},{id:'d2',kind:'select',options:DIR_OPTIONS}
   ],
   compile:(v)=>[{dir:v.d1, count: parseInt(v.c1,10)||0},{dir:v.d2, count: parseInt(v.c2,10)||0}],
   successMsg:'Заобиколи камъните с точен код! 🪨🌟'},

  {title:'По-дълъг маршрут', type:'live',
   story:'Лабиринтът е по-голям. Комбинирай посоки и брой стъпки в двата цикъла, за да преведеш Мия отвъд стените.',
   fact:'Колкото по-сложен е пътят, толкова по-важно е внимателно да пресметнеш всяко число в кода си.',
   grid:{rows:5, cols:5, start:[4,0], goal:[0,4], walls:[[4,1],[3,1],[2,1],[1,3],[2,3],[3,3]]},
   codeLines:['for (int i = 0; i < {{c1}}; i++) { move({{d1}}); }','for (int i = 0; i < {{c2}}; i++) { move({{d2}}); }'],
   blanks:[
     {id:'c1',kind:'number'},{id:'d1',kind:'select',options:DIR_OPTIONS},
     {id:'c2',kind:'number'},{id:'d2',kind:'select',options:DIR_OPTIONS}
   ],
   compile:(v)=>[{dir:v.d1, count: parseInt(v.c1,10)||0},{dir:v.d2, count: parseInt(v.c2,10)||0}],
   successMsg:'Преведе Мия през целия лабиринт с истински код! 🧩🌟'},

  {title:'Финалната мисия', type:'live',
   story:'Открит терен, без стени! Комбинирай до 4 цикъла с каквито посоки и числа искаш — няма един верен начин, стига да стигнеш звездата.',
   fact:'В истинското програмиране често има много различни решения на един и същ проблем — важното е резултатът да е верен.',
   grid:{rows:4, cols:4, start:[3,0], goal:[0,3], walls:[]},
   codeLines:[
     'for (int i = 0; i < {{c1}}; i++) { move({{d1}}); }',
     'for (int i = 0; i < {{c2}}; i++) { move({{d2}}); }',
     'for (int i = 0; i < {{c3}}; i++) { move({{d3}}); }',
     'for (int i = 0; i < {{c4}}; i++) { move({{d4}}); }'
   ],
   blanks:[
     {id:'c1',kind:'number'},{id:'d1',kind:'select',options:DIR_OPTIONS},
     {id:'c2',kind:'number'},{id:'d2',kind:'select',options:DIR_OPTIONS},
     {id:'c3',kind:'number'},{id:'d3',kind:'select',options:DIR_OPTIONS},
     {id:'c4',kind:'number'},{id:'d4',kind:'select',options:DIR_OPTIONS}
   ],
   compile:(v)=>[
     {dir:v.d1, count: parseInt(v.c1,10)||0},{dir:v.d2, count: parseInt(v.c2,10)||0},
     {dir:v.d3, count: parseInt(v.c3,10)||0},{dir:v.d4, count: parseInt(v.c4,10)||0}
   ],
   successMsg:'🏆 Мисията е изпълнена! Ти написа истински код, който оживя героя от начало до край!'},

  {title:'Начертай права', type:'draw',
   story:'Първото заклинание на четката! forward(число) чертае права линия с дължина, която ти избираш. Опитай различни числа.',
   fact:'В компютърната графика всяка форма — дори най-сложната — започва от прави линии, начертани с код.',
   canvas:{size:280},
   codeLines:['forward({{b1}});'],
   blanks:[{id:'b1',kind:'number'}],
   compile:(v)=>[{op:'forward', dist:parseFloat(v.b1)||0}],
   successMsg:'Първата ти линия оживя на платното! ✏️✨'},

  {title:'Начертай квадрат', type:'draw',
   story:'Комбинирай forward и turn в цикъл, за да начертаеш фигура. Завий на 90° четири пъти, за да получиш точен квадрат — или пробвай друго число и виж каква фигура ще излезе!',
   fact:'Това е истинско параметрично проектиране — с едни и същи команди, но различни числа, получаваш безброй различни форми.',
   canvas:{size:280},
   codeLines:['for (int i = 0; i < 4; i++) {','  forward({{b1}});','  turn({{b2}});','}'],
   blanks:[{id:'b1',kind:'number'},{id:'b2',kind:'number'}],
   compile:(v)=>{ const ops=[]; for(let i=0;i<4;i++){ ops.push({op:'forward',dist:parseFloat(v.b1)||0}); ops.push({op:'turn',deg:parseFloat(v.b2)||0}); } return ops; },
   successMsg:'Фигурата оживя с цветове! 🟪✨'},

  {title:'Начертай звезда', type:'draw',
   story:'За правилна 5-лъчева звезда четката трябва да завива на точно 144° всеки път, 5 пъти. Пробвай и виж магията!',
   fact:'Ъгълът 144° идва от 360° ÷ 5 × 2 — истинска геометрия зад всяка красива фигура.',
   canvas:{size:280},
   codeLines:['for (int i = 0; i < 5; i++) {','  forward({{b1}});','  turn({{b2}});','}'],
   blanks:[{id:'b1',kind:'number'},{id:'b2',kind:'number'}],
   compile:(v)=>{ const ops=[]; for(let i=0;i<5;i++){ ops.push({op:'forward',dist:parseFloat(v.b1)||0}); ops.push({op:'turn',deg:parseFloat(v.b2)||0}); } return ops; },
   successMsg:'Звездата ти грейна на платното! ⭐🖌️'},

  {title:'Приказна къщичка', type:'draw',
   story:'Финалната картина на Книгата на четката! Комбинирай два цвята и две форми — квадрат за къщата, триъгълник за покрива.',
   fact:'Истинските дигитални илюстрации и дори видео игрите започват точно така — прости форми, наредени с код в по-голяма картина.',
   canvas:{size:280},
   codeLines:['penColor({{col1}});','for (int i = 0; i < 4; i++) { forward({{b1}}); turn(90); }','penColor({{col2}});','for (int i = 0; i < 3; i++) { forward({{b2}}); turn(120); }'],
   blanks:[
     {id:'col1',kind:'select',options:[{value:'#FF6FA5',label:'розово'},{value:'#4FA1E8',label:'синьо'},{value:'#2FB893',label:'зелено'}]},
     {id:'b1',kind:'number'},
     {id:'col2',kind:'select',options:[{value:'#E8703A',label:'оранжево'},{value:'#D6467F',label:'малиново'},{value:'#8B4FE8',label:'лилаво'}]},
     {id:'b2',kind:'number'}
   ],
   compile:(v)=>{
     const ops=[{op:'color', value:v.col1}];
     for(let i=0;i<4;i++){ ops.push({op:'forward',dist:parseFloat(v.b1)||0}); ops.push({op:'turn',deg:90}); }
     ops.push({op:'color', value:v.col2});
     for(let i=0;i<3;i++){ ops.push({op:'forward',dist:parseFloat(v.b2)||0}); ops.push({op:'turn',deg:120}); }
     return ops;
   },
   successMsg:'Приказната къщичка е нарисувана изцяло с твой код! 🏠🎨'},

  {title:'Направи играта — Улови звездите', type:'game',
   story:'Последната и най-силна магия — сътворението! Настрой правилата на своя игра с код: колко бързо падат звездите и колко трябват за победа. После натисни „Играй“ и я изпробвай сама!',
   fact:'Всяка истинска игра — от малка мобилна игра до Unity — има същите части: правила, зададени с код, и играч, който взаимодейства с тях в реално време.',
   game:{basketY:210, canvasW:300, canvasH:240, hasRocks:false},
   codeLines:['int skorost_padane = {{b1}};   // 1 (бавно) — 8 (бързо)','int zvezdi_za_pobeda = {{b2}};'],
   blanks:[{id:'b1',kind:'number'},{id:'b2',kind:'number'}],
   compile:(v)=>({ speed: Math.min(8, Math.max(1, parseInt(v.b1,10)||3)), winScore: Math.min(30, Math.max(1, parseInt(v.b2,10)||10)), rockChance:0 }),
   successMsg:'Ти създаде истинска игра — и я победи! 🕹️🏆'},

  {title:'Усложни играта — камъни и звезди', type:'game',
   story:'Добави предизвикателство! Сега освен звезди ще падат и камъни 🪨 — те не се броят за победа. Настрой всичко и играй отново.',
   fact:'Добавянето на препятствия е истински дизайн на трудност — точно това правят гейм дизайнерите, за да направят играта интересна.',
   game:{basketY:210, canvasW:300, canvasH:240, hasRocks:true},
   codeLines:['int skorost_padane = {{b1}};   // 1 (бавно) — 8 (бързо)','int zvezdi_za_pobeda = {{b2}};','int shans_za_kamak = {{b3}};   // 0–50 %'],
   blanks:[{id:'b1',kind:'number'},{id:'b2',kind:'number'},{id:'b3',kind:'number'}],
   compile:(v)=>({ speed: Math.min(8, Math.max(1, parseInt(v.b1,10)||3)), winScore: Math.min(30, Math.max(1, parseInt(v.b2,10)||10)), rockChance: Math.min(50, Math.max(0, parseInt(v.b3,10)||20)) }),
   successMsg:'🏆 Ти си истинска гейм дизайнерка! Играта е готова и победена!'},

  {title:'Обявата за фестивала', type:'blanks',
   story:'Луна, Бо и Мия решават да организират Фестивал на звездите за целия квартал! Първо пишат обявата — съедини думите с интервал между тях.',
   fact:'+ съединява (конкатенира) низове в C++ — точно както при пълното име на Мия по-рано.',
   codeLines:['string obqva = "Фестивал" + {{b1}} + "на звездите";'],
   blanks:[{id:'b1',kind:'select',options:[{value:'space',label:'" " (интервал)'},{value:'empty',label:'"" (нищо)'},{value:'dash',label:'"-"'}],correct:'space'}],
   successMsg:'Обявата е готова — „Фестивал на звездите“! 📣✨',
   sequel:{story:'Бо иска и своя собствена обява за кучешкото шоу — съедини думите по същия начин.',
     codeLines:['string obqva_bo = "Куче" + {{b1}} + "шоу";'],
     blanks:[{id:'b1',kind:'select',options:[{value:'space',label:'" " (интервал)'},{value:'empty',label:'"" (нищо)'},{value:'dash',label:'"-"'}],correct:'space'}],
     successMsg:'Бо ще участва с „Куче шоу“! 🐶🎪'}},

  {title:'Билети за фестивала', type:'blanks',
   story:'На фестивала идват 6 гости, но първият ред има само 4 места. Провери всеки гост с цикъл и условие, за да преброиш само тези, които сядат отпред.',
   fact:'Цикъл с условие вътре в него ти позволява да броиш само елементите, които отговарят на определено правило — точно като с високите кученца по-рано.',
   codeLines:['int mesta_otpred = 0;','for (int i = 0; i < 6; i++) {','  if (i {{b1}} 4) { mesta_otpred = mesta_otpred + 1; }','}','// mesta_otpred = {{b2}}'],
   blanks:[{id:'b1',kind:'select',options:[{value:'<',label:'<'},{value:'>',label:'>'},{value:'==',label:'=='}],correct:'<'},{id:'b2',kind:'number',correct:4}],
   successMsg:'Точно 4 гости седят на първия ред! 🎫',
   sequel:{story:'На втория ден местата отпред станаха 5, а гостите — 7. Провери отново кой сяда отпред.',
     codeLines:['int mesta_otpred = 0;','for (int i = 0; i < 7; i++) {','  if (i {{b1}} 5) { mesta_otpred = mesta_otpred + 1; }','}','// mesta_otpred = {{b2}}'],
     blanks:[{id:'b1',kind:'select',options:[{value:'<',label:'<'},{value:'>',label:'>'},{value:'==',label:'=='}],correct:'<'},{id:'b2',kind:'number',correct:5}],
     successMsg:'Този път 5 гости са на първия ред — местата се увеличиха! 🎫✨'}},

  {title:'Редът на фестивала', type:'order',
   story:'Фестивалът трябва да протече по ред: първо добре дошли, после трикът на Бо, а накрая — салют от звезди.',
   fact:'Редът на командите оформя цялата програма — точно както редът на събитията оформя фестивала.',
   chips:[{id:'a',label:'cout << "Добре дошли на фестивала!";'},{id:'b',label:'cout << "Бо показва трика си!";'},{id:'c',label:'cout << "Салют от звезди!";'}],
   correctOrder:['a','b','c'], successMsg:'Фестивалът мина перфектно по ред! 🎉',
   sequel:{story:'На втория ден редът е друг: първо добре дошли, после модно ревю на Мия, а накрая — песента на Луна.',
     chips:[{id:'a',label:'cout << "Добре дошли, ден 2!";'},{id:'b',label:'cout << "Модно ревю на Мия!";'},{id:'c',label:'cout << "Песента на Луна!";'}],
     correctOrder:['a','b','c'], successMsg:'Вторият ден на фестивала беше вълшебен! 🎶'}},

  {title:'Приключението продължава отвъд Коко Код', type:'info',
   story:'Фестивалът на звездите завърши с грандиозен успех — и с него завършва тази книга. Но истинското приключение с код тепърва започва!',
   fact:'Всичко, което научи тук — променливи, условия, цикли, функции, масиви, класове — е точната основа, върху която са построени истински езици за програмиране.',
   infoBody:[
     '🐍 Python е чудесна следваща стъпка — четлив език, използван за игри, изкуствен интелект и анализ на данни.',
     '🌐 JavaScript оживява сайтове точно като този, който вече разгледахме — с промени в реално време в браузъра.',
     '🎮 Ако ти хареса Арената и играта със звездите, Unity (C#) и Godot (GDScript) са страхотни следващи спирки за дизайн на игри.',
     '🚀 Каквото и да избереш — продължавай да строиш, да грешиш и да поправяш. Точно така порасва всеки истински програмист.'
   ],
   successMsg:'Ти измина целия път от първата стрелка до собствена игра — истинска програмистка! 🌟👩‍💻'},

  {title:'🎁 Тайната глава — Задругата на Звездния код', type:'info',
   story:'Тайната карта отведе Луна, Бо и Мия в скрита зала под кодовата академия, където ги посрещнаха всички, извървели пътя преди тях — пазителите на Кодекса на хилядите искри, древен артефакт, събрал знанието на всеки завършил.',
   fact:'Оттук нататък тримата вече не бяха просто ученици, а другари в Задругата на Звездния код — заклели се да пазят знанието живо и да го предават на всеки нов пътешественик по пътя на кода.',
   infoBody:[
     '🏅 Луна ти връчва тайния медал на Задругата — направен от звезден прах и мъркане.',
     '📖 Бо пази Кодекса на хилядите искри и е много горд да добави твоето име сред пазителите му.',
     '👗 Мия организира тайно парти само за Задругата — с бисквитки, разбира се.',
     '🌟 Истинската тайна е, че кодът никога не свършва — винаги има ново приключение, ново ниво, нова идея за построяване.'
   ],
   successMsg:'Добре дошла в Задругата на Звездния код — ти си истинска легенда на Коко Код! 🎉🏅'}
  ];

  function defaultUnlocked(){ return lessons.map((l,i)=> i===0); }
  function defaultStars(){ return lessons.map(()=> false); }

  const mascots = ['🐱','🐶','👗'];
  lessons.forEach((l,i)=>{ l.id=i+1; l.mascot = mascots[i%3]; });
  function chapterFor(id){ return chapters.find(c => id>=c.range[0] && id<=c.range[1]); }

  let state, onSave, container, current = 0, orderState = [], steps = [], stepIdx = 0;

  function mount(rootEl, progress, saveFn){
    state = progress; onSave = saveFn; container = rootEl;
    while(state.unlocked.length < lessons.length) state.unlocked.push(false);
    while(state.stars.length < lessons.length) state.stars.push(false);
    for(let i=0; i<lessons.length-1; i++){ if(state.stars[i] && !state.unlocked[i+1]) state.unlocked[i+1] = true; }
    if(state.lastLesson >= lessons.length) state.lastLesson = lessons.length-1;
    onSave(state);
    current = state.lastLesson || 0;
    container.innerHTML = `
      <section>
        <div class="section-head">
          <span class="kicker">Практика</span>
          <h2>Пътят на Луна, Бо и Мия</h2>
          <p>Всеки урок има обяснение, упражнение, кратък преговор и самостоятелна практика — общо около 15–20 минути. След глава 7 се отключва живата арена за кодиране!</p>
          <button class="hint-btn" id="bReviewBtn" style="margin-top:14px;">🔄 Бърз преговор на стари уроци</button>
        </div>
        <div id="bRecoBanner"></div>
        <div id="bChapterList"></div>
        <div class="step-progress" id="bStepProgress"></div>
        <div class="b-lesson-panel" id="bPanel">
          <div class="b-lesson-left" id="bLeftCol"></div>
          <div class="b-lesson-right" id="bRightCol"></div>
        </div>
      </section>`;
    container.querySelector('#bReviewBtn').addEventListener('click', startReview);
    renderMap(); loadLesson();
  }

  function renderMap(){
    const wrap = container.querySelector('#bChapterList'); wrap.innerHTML = '';
    const myInterests = (typeof profile !== 'undefined' && profile && Array.isArray(profile.interests)) ? profile.interests : [];
    const matched = myInterests.length ? chapters.filter(ch => ch.tags && ch.tags.some(t => myInterests.includes(t))) : [];
    const bannerHost = container.querySelector('#bRecoBanner');
    if(bannerHost){
      if(matched.length){
        const labels = INTERESTS.filter(it => myInterests.includes(it.id)).map(it => it.emoji + ' ' + it.label).join(', ');
        bannerHost.innerHTML = `<div class="reco-banner">
          <h4>🌳 Твоето дърво на ученето</h4>
          <p>Избрала си: ${labels}. Ето главите, които най-много ти пасват — търси значката ✨ по-долу!</p>
          <div class="reco-jumps">${matched.map(ch => `<button class="reco-jump-btn" data-ch="${ch.n}">${ch.n}. ${ch.title}</button>`).join('')}</div>
        </div>`;
        bannerHost.querySelectorAll('.reco-jump-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const ch = chapters.find(c => c.n === parseInt(btn.dataset.ch,10));
            const idx = ch.range[0]-1;
            if(state.unlocked[idx]){ current = idx; loadLesson();
              container.querySelector('#bPanel').scrollIntoView({behavior:'smooth', block:'center'}); }
            else { container.querySelector(`.b-chapter-block[data-ch="${ch.n}"]`)?.scrollIntoView({behavior:'smooth', block:'center'}); }
          });
        });
      } else bannerHost.innerHTML = '';
    }
    chapters.forEach(ch => {
      const block = document.createElement('div'); block.className='b-chapter-block'; block.dataset.ch = ch.n;
      const [bg, deep] = ch.color;
      const isReco = matched.includes(ch);
      const title = document.createElement('div'); title.className='b-chapter-title';
      title.innerHTML = `<span class="num" style="background:${deep}">${ch.n}</span><span>${ch.title}</span>${isReco ? '<span class="reco-badge" title="Препоръчано за теб по интереси">✨</span>' : ''}`;
      block.appendChild(title);
      if(ch.intro){
        const intro = document.createElement('p'); intro.className='b-chapter-intro'; intro.textContent = ch.intro;
        block.appendChild(intro);
      }
      const row = document.createElement('div'); row.className='b-badge-row';
      for(let id=ch.range[0]; id<=ch.range[1]; id++){
        const idx = id-1;
        const btn = document.createElement('button');
        btn.className = 'b-badge' + (!state.unlocked[idx]?' locked':'') + (idx===current?' current':'');
        btn.style.background = state.unlocked[idx] ? bg : '';
        btn.style.color = state.unlocked[idx] ? '#3E2247' : '';
        btn.innerHTML = id + (state.stars[idx] ? '<span class="star">⭐</span>' : '');
        btn.disabled = !state.unlocked[idx];
        btn.onclick = () => { current = idx; loadLesson();
          container.querySelector('#bPanel').scrollIntoView({behavior:'smooth', block:'center'}); };
        row.appendChild(btn);
      }
      block.appendChild(row); wrap.appendChild(block);
    });
  }

  function buildQuiz(lesson, idx){
    const pool = lessons.filter((l,i) => i!==idx).map(l => l.fact);
    const shuffled = pool.slice().sort(() => Math.random()-0.5).slice(0,2);
    const options = [lesson.fact, ...shuffled].sort(() => Math.random()-0.5);
    return { correct: lesson.fact, options };
  }

  function buildSteps(lesson, idx){
    const built = [{kind:'explain'}];
    if(lesson.type === 'info'){
      built.push({kind:'inforead'});
      built.push(Object.assign({kind:'quiz'}, buildQuiz(lesson, idx)));
    } else if(lesson.type === 'live'){
      built.push({kind:'live'});
    } else if(lesson.type === 'draw'){
      built.push({kind:'draw'});
    } else if(lesson.type === 'game'){
      built.push({kind:'game'});
    } else {
      built.push({kind:'exercise', repeat:false});
      built.push(Object.assign({kind:'quiz'}, buildQuiz(lesson, idx)));
      built.push({kind:'exercise', repeat:true});
    }
    built.push({kind:'complete'});
    return built;
  }

  function loadLesson(){
    state.lastLesson = current; onSave(state);
    steps = buildSteps(lessons[current], current);
    stepIdx = 0;
    renderMap(); renderStep();
  }

  function renderStepProgress(){
    const wrap = container.querySelector('#bStepProgress'); wrap.innerHTML = '';
    const cap = document.createElement('span'); cap.className='step-caption';
    cap.textContent = `Стъпка ${stepIdx+1} от ${steps.length}`;
    wrap.appendChild(cap);
    steps.forEach((s,i) => {
      const dot = document.createElement('span');
      dot.className = 'step-dot' + (i<stepIdx?' done':'') + (i===stepIdx?' active':'');
      wrap.appendChild(dot);
    });
  }

  function renderStep(){
    stopGame();
    const lesson = lessons[current];
    const ch = chapterFor(lesson.id);
    renderStepProgress();
    const left = container.querySelector('#bLeftCol');
    const right = container.querySelector('#bRightCol');
    const panel = container.querySelector('#bPanel');
    left.innerHTML=''; right.innerHTML=''; right.style.display='block'; panel.classList.remove('single-col');
    const step = steps[stepIdx];
    const badgeHtml = `<span class="b-chapter-badge" style="background:${ch.color[0]};color:${ch.color[1]}">Урок ${lesson.id} · Глава ${ch.n}</span>`;

    if(step.kind === 'explain'){
      const note = lesson.type==='info' ? 'Натисни напред, за да продължиш.'
        : lesson.type==='live' ? 'Ето синтаксиса, който ще използваш — после ще напишеш истински движещ код!'
        : lesson.type==='draw' ? 'Ето как четката рисува — после ще напишеш свой код за рисуване!'
        : lesson.type==='game' ? 'Настрой правилата на играта с код — после ще я играеш на живо!'
        : 'Виж как изглежда правилното решение, преди да пробваш сама:';
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Обяснение</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <p class="b-story">${lesson.story}</p>
        <div class="b-fact">💡 ${lesson.fact}</div>
        <button class="audio-btn" id="bAudioBtn" style="margin-top:10px;">🔊 Слушай</button>
        <div class="worked-note">${note}</div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn">Разбрах, напред →</button></div>`;
      container.querySelector('#bAudioBtn').addEventListener('click', () => speakText(lesson.story + ' ' + lesson.fact));
      if(lesson.type==='blanks' || lesson.type==='order'){
        right.innerHTML = `<div class="b-stage-title">Готово решение</div><div class="b-code-block" id="bWorked"></div>`;
        renderWorked(lesson, container.querySelector('#bWorked'));
      } else if(lesson.type==='live'){
        right.innerHTML = `<div class="b-stage-title">Как работи движението</div><div class="b-code-block">
          <div class="b-code-line"><span class="b-code-text">move(right);  // 1 стъпка надясно</span></div>
          <div class="b-code-line"><span class="b-code-text">for (int i = 0; i < 3; i++) {</span></div>
          <div class="b-code-line"><span class="b-code-text">&nbsp;&nbsp;move(up);  // повтаря се 3 пъти</span></div>
          <div class="b-code-line"><span class="b-code-text">}</span></div>
        </div>`;
      } else if(lesson.type==='draw'){
        right.innerHTML = `<div class="b-stage-title">Как работи четката</div><div class="b-code-block">
          <div class="b-code-line"><span class="b-code-text">forward(50);  // чертае 50 напред</span></div>
          <div class="b-code-line"><span class="b-code-text">turn(90);  // завива на 90°</span></div>
          <div class="b-code-line"><span class="b-code-text">penColor("розово");  // сменя цвета</span></div>
        </div>`;
      } else if(lesson.type==='game'){
        right.innerHTML = `<div class="b-stage-title">Как работи играта</div><div class="b-code-block">
          <div class="b-code-line"><span class="b-code-text">int skorost = {{X}};  // трудност</span></div>
          <div class="b-code-line"><span class="b-code-text">int cel = {{Y}};  // колко трябват за победа</span></div>
          <div class="b-code-line"><span class="b-code-text">// после играеш с ⬅️ ➡️ на живо!</span></div>
        </div>`;
      } else { right.style.display='none'; panel.classList.add('single-col'); }
      container.querySelector('#stepNextBtn').addEventListener('click', goNext);
    }
    else if(step.kind === 'exercise'){
      const ex = step.repeat ? lesson.sequel : lesson;
      left.innerHTML = `${badgeHtml}<div class="step-kicker">${step.repeat ? 'Историята продължава' : 'Упражнение'}</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}${step.repeat ? ' — част 2' : ''}</h3>
        <p class="b-story">${ex.story}</p>
        <div class="b-action-row">
          <button class="b-btn-run" id="bCheck">✔ Провери</button>
          <button class="b-btn-reset" id="bReset">Изчисти</button>
        </div>
        <div class="b-message" id="bMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      right.innerHTML = `<div class="b-stage-title">Код</div><div class="b-code-block" id="bStage"></div>`;
      renderExerciseStage(lesson, ex);
      container.querySelector('#bCheck').addEventListener('click', () => checkExercise(lesson, ex));
      container.querySelector('#bReset').addEventListener('click', () => {
        const msg = container.querySelector('#bMsg'); msg.textContent=''; msg.className='b-message';
        container.querySelector('#stepNextBtn').disabled = true;
        renderExerciseStage(lesson, ex);
      });
      container.querySelector('#stepNextBtn').addEventListener('click', goNext);
    }
    else if(step.kind === 'live'){
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Живо кодиране</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <p class="b-story">${lesson.story}</p>
        <div class="b-action-row">
          <button class="b-btn-run" id="bLiveRun">▶ Изпълни кода</button>
        </div>
        <div class="a-message" id="bLiveMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      right.innerHTML = `<div class="b-stage-title">Твоят код</div><div class="b-code-block" id="bLiveCode"></div>
        <div class="b-stage-title" style="margin-top:14px;">Терен на живо</div>
        <div class="a-grid-stage" id="bLiveGrid" style="margin:0 auto;"></div>`;
      renderLiveBlanks(lesson);
      const gridEl = container.querySelector('#bLiveGrid');
      buildLiveGrid(lesson.grid, gridEl);
      const msgEl = container.querySelector('#bLiveMsg');
      const nextBtn = container.querySelector('#stepNextBtn');
      container.querySelector('#bLiveRun').addEventListener('click', () => runLive(lesson, gridEl, msgEl, nextBtn));
      nextBtn.addEventListener('click', goNext);
    }
    else if(step.kind === 'draw'){
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Рисуване с код</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <p class="b-story">${lesson.story}</p>
        <div class="b-action-row">
          <button class="b-btn-run" id="bDrawRun">🖌️ Нарисувай</button>
          <button class="b-btn-reset" id="bDrawClear">Изчисти платното</button>
        </div>
        <div class="a-message" id="bDrawMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      right.innerHTML = `<div class="b-stage-title">Твоят код</div><div class="b-code-block" id="bDrawCode"></div>
        <div class="b-stage-title" style="margin-top:14px;">Платно</div>
        <div class="draw-canvas-wrap"><canvas id="bDrawCanvas" width="${lesson.canvas.size}" height="${lesson.canvas.size}"></canvas></div>`;
      renderDrawBlanks(lesson);
      clearDrawCanvas(lesson);
      const msgEl = container.querySelector('#bDrawMsg');
      const nextBtn = container.querySelector('#stepNextBtn');
      container.querySelector('#bDrawRun').addEventListener('click', () => runDraw(lesson, msgEl, nextBtn));
      container.querySelector('#bDrawClear').addEventListener('click', () => { clearDrawCanvas(lesson); msgEl.textContent=''; msgEl.className='a-message'; });
      nextBtn.addEventListener('click', goNext);
    }
    else if(step.kind === 'game'){
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Направи игра</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <p class="b-story">${lesson.story}</p>
        <div class="b-action-row">
          <button class="b-btn-run" id="bGameRun">🎮 Играй!</button>
        </div>
        <div class="a-message" id="bGameMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      right.innerHTML = `<div class="b-stage-title">Настройки на играта</div><div class="b-code-block" id="bGameCode"></div>
        <div class="b-stage-title" style="margin-top:14px;">Играй тук</div>
        <div class="game-canvas-wrap"><canvas id="bGameCanvas" width="${lesson.game.canvasW}" height="${lesson.game.canvasH}"></canvas>
          <div class="game-score" id="bGameScore" style="display:none;"></div></div>
        <div class="game-controls">
          <button class="game-ctrl-btn" id="bGameLeft">⬅️</button>
          <button class="game-ctrl-btn" id="bGameRight">➡️</button>
        </div>`;
      renderGameBlanks(lesson);
      drawGameIdle(lesson);
      const msgEl = container.querySelector('#bGameMsg');
      const nextBtn = container.querySelector('#stepNextBtn');
      container.querySelector('#bGameRun').addEventListener('click', () => startGame(lesson, msgEl, nextBtn));
      nextBtn.addEventListener('click', () => { stopGame(); goNext(); });
    }
    else if(step.kind === 'quiz'){
      panel.classList.add('single-col'); right.style.display='none';
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Бърз преговор</div>
        <div class="quiz-question">Кое от следните е вярно за този урок?</div>
        <div id="quizOpts"></div>
        <div class="b-message" id="bQuizMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      const optsWrap = container.querySelector('#quizOpts');
      const quizMsg = container.querySelector('#bQuizMsg');
      step.options.forEach(opt => {
        const btn = document.createElement('button'); btn.className='quiz-opt'; btn.textContent = opt;
        btn.onclick = () => {
          const isRight = opt === step.correct;
          if(isRight){
            btn.classList.add('right');
            quizMsg.textContent = '🎉 Точно така!'; quizMsg.className='b-message ok';
            container.querySelector('#stepNextBtn').disabled=false;
            optsWrap.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
          } else {
            btn.classList.add('wrong'); btn.disabled = true;
            quizMsg.innerHTML = `🤔 <strong>Не точно.</strong> ${lesson.fact}<br>Тази опция вече е изключена — помисли и пробвай друга.`;
            quizMsg.className='b-message bad';
            const others = Array.from(optsWrap.querySelectorAll('.quiz-opt')).filter(b=>!b.classList.contains('wrong'));
            startLockout(quizMsg, 10, others);
          }
        };
        optsWrap.appendChild(btn);
      });
      container.querySelector('#stepNextBtn').addEventListener('click', goNext);
    }
    else if(step.kind === 'inforead'){
      panel.classList.add('single-col'); right.style.display='none';
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Какво следва</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <div class="b-info-card" style="margin-top:14px;">
          <h4>🚀 Отвъд Коко Код</h4>
          ${lesson.infoBody.map(t=>`<p>${t}</p>`).join('')}
          <div class="tags"><span class="tag">Unity · C#</span><span class="tag">.NET</span><span class="tag">Go (Golang)</span></div>
        </div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn">Напред →</button></div>`;
      container.querySelector('#stepNextBtn').addEventListener('click', goNext);
    }
    else if(step.kind === 'complete'){
      panel.classList.add('single-col'); right.style.display='none';
      left.innerHTML = `<div class="complete-card">
          <div class="big-star">⭐</div>
          <h3>Урок ${lesson.id} завършен!</h3>
          <p class="b-story">${lesson.successMsg}</p>
          <div class="step-nav" style="justify-content:center;">
            <button class="step-next" id="bNextLesson">${current<lessons.length-1 ? 'Следващ урок →' : 'Готово 🏆'}</button>
          </div>
        </div>`;
      container.querySelector('#bNextLesson').addEventListener('click', () => {
        if(current < lessons.length-1){ current++; loadLesson();
          container.querySelector('#bPanel').scrollIntoView({behavior:'smooth', block:'center'}); }
      });
    }
  }

  function goNext(){
    stepIdx++;
    if(steps[stepIdx].kind === 'complete' && !state.stars[current]){
      state.stars[current] = true;
      if(current < lessons.length-1) state.unlocked[current+1] = true;
      onSave(state); renderMap();
      fireConfetti();
    }
    renderStep();
  }

  function renderLiveBlanks(lesson){
    const stage = container.querySelector('#bLiveCode'); stage.innerHTML='';
    lesson.codeLines.forEach(lineStr => {
      const lineEl = document.createElement('div'); lineEl.className='b-code-line';
      const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
      parts.forEach(part => {
        const m = part.match(/^\{\{(\w+)\}\}$/);
        if(m){
          const blank = lesson.blanks.find(b=>b.id===m[1]);
          if(blank.kind==='number'){
            const inp = document.createElement('input');
            inp.type='number'; inp.className='b-blank-input'; inp.dataset.id=blank.id; inp.placeholder='?';
            lineEl.appendChild(inp);
          } else {
            const sel = document.createElement('select');
            sel.className='b-blank-select'; sel.dataset.id=blank.id;
            const def = document.createElement('option'); def.value=''; def.textContent='— избери —';
            sel.appendChild(def);
            blank.options.forEach(o => { const opt=document.createElement('option'); opt.value=o.value; opt.textContent=o.label; sel.appendChild(opt); });
            lineEl.appendChild(sel);
          }
        } else {
          const span = document.createElement('span'); span.className='b-code-text'; span.textContent=part;
          lineEl.appendChild(span);
        }
      });
      stage.appendChild(lineEl);
    });
  }

  function buildLiveGrid(grid, gridEl){
    gridEl.style.gridTemplateColumns = `repeat(${grid.cols}, 46px)`;
    gridEl.style.gridTemplateRows = `repeat(${grid.rows}, 46px)`;
    gridEl.innerHTML = '';
    for(let r=0;r<grid.rows;r++){
      for(let c=0;c<grid.cols;c++){
        const cell = document.createElement('div'); cell.className='a-cell';
        const isWall = grid.walls.some(w=>w[0]===r&&w[1]===c);
        const isGoal = grid.goal[0]===r && grid.goal[1]===c;
        if(isWall){ cell.classList.add('wall'); cell.textContent='🪨'; }
        else if(isGoal){ cell.classList.add('goal'); cell.textContent='⭐'; }
        gridEl.appendChild(cell);
      }
    }
    const token = document.createElement('div'); token.className='a-robot-token'; token.id='bLiveToken'; token.textContent='🧚‍♀️';
    gridEl.appendChild(token);
    positionLiveToken(grid.start[0], grid.start[1], gridEl);
  }

  function positionLiveToken(r, c, gridEl){
    const token = gridEl.querySelector('#bLiveToken');
    token.style.left = (c*(46+4)+10)+'px'; token.style.top = (r*(46+4)+10)+'px';
  }

  function delay(ms){ return new Promise(res=>setTimeout(res,ms)); }

  async function runLive(lesson, gridEl, msgEl, nextBtn){
    const codeEl = container.querySelector('#bLiveCode');
    const values = {}; let allFilled = true;
    lesson.blanks.forEach(b => {
      const el = codeEl.querySelector(`[data-id="${b.id}"]`);
      const val = (el.value||'').trim();
      if(val==='') allFilled = false;
      values[b.id] = val;
    });
    if(!allFilled){ msgEl.textContent = '✏️ Попълни всички стойности в кода първо.'; msgEl.className='a-message bad'; return; }

    const moves = lesson.compile(values);
    const grid = lesson.grid;
    let r = grid.start[0], c = grid.start[1];
    positionLiveToken(r, c, gridEl);
    msgEl.textContent=''; msgEl.className='a-message';
    await delay(200);
    let blocked = false;
    outer: for(const seg of moves){
      const n = Math.max(0, seg.count||0);
      for(let i=0;i<n;i++){
        let nr=r, nc=c;
        if(seg.dir==='up') nr--; if(seg.dir==='down') nr++;
        if(seg.dir==='left') nc--; if(seg.dir==='right') nc++;
        const oob = nr<0||nr>=grid.rows||nc<0||nc>=grid.cols;
        const wall = grid.walls.some(w=>w[0]===nr&&w[1]===nc);
        if(oob||wall){ blocked=true; break outer; }
        r=nr; c=nc; positionLiveToken(r,c,gridEl); await delay(300);
        if(r===grid.goal[0] && c===grid.goal[1]) break outer;
      }
    }
    await delay(150);
    if(r===grid.goal[0] && c===grid.goal[1]){
      msgEl.textContent = '🎉 ' + lesson.successMsg; msgEl.className='a-message ok';
      nextBtn.disabled = false;
    } else if(blocked){
      msgEl.textContent = '💥 Опа! Кодът изведе героя извън пътя. Провери числата и посоките и пробвай пак.'; msgEl.className='a-message bad';
    } else {
      msgEl.textContent = '🤔 Почти! Героят спря, но не стигна звездата. Коригирай кода и пробвай пак.'; msgEl.className='a-message bad';
    }
  }

  /* ---------- Chapter 9: Drawing with code (turtle graphics) ---------- */
  function renderDrawBlanks(lesson){
    const stage = container.querySelector('#bDrawCode'); stage.innerHTML='';
    lesson.codeLines.forEach(lineStr => {
      const lineEl = document.createElement('div'); lineEl.className='b-code-line';
      const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
      parts.forEach(part => {
        const m = part.match(/^\{\{(\w+)\}\}$/);
        if(m){
          const blank = lesson.blanks.find(b=>b.id===m[1]);
          if(blank.kind==='number'){
            const inp = document.createElement('input');
            inp.type='number'; inp.className='b-blank-input'; inp.dataset.id=blank.id; inp.placeholder='?';
            lineEl.appendChild(inp);
          } else {
            const sel = document.createElement('select');
            sel.className='b-blank-select'; sel.dataset.id=blank.id;
            const def = document.createElement('option'); def.value=''; def.textContent='— избери —';
            sel.appendChild(def);
            blank.options.forEach(o => { const opt=document.createElement('option'); opt.value=o.value; opt.textContent=o.label; sel.appendChild(opt); });
            lineEl.appendChild(sel);
          }
        } else {
          const span = document.createElement('span'); span.className='b-code-text'; span.textContent=part;
          lineEl.appendChild(span);
        }
      });
      stage.appendChild(lineEl);
    });
  }

  function clearDrawCanvas(lesson){
    const cv = container.querySelector('#bDrawCanvas');
    if(!cv) return;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#FFFAF3'; ctx.fillRect(0,0,cv.width,cv.height);
  }

  async function runDraw(lesson, msgEl, nextBtn){
    const codeEl = container.querySelector('#bDrawCode');
    let allFilled = true; const values = {};
    lesson.blanks.forEach(b => {
      const el = codeEl.querySelector(`[data-id="${b.id}"]`);
      const val = (el.value||'').trim();
      if(val==='') allFilled=false;
      values[b.id] = val;
    });
    if(!allFilled){ msgEl.textContent='✏️ Попълни всички стойности първо.'; msgEl.className='a-message bad'; return; }
    const ops = lesson.compile(values);
    const cv = container.querySelector('#bDrawCanvas');
    const ctx = cv.getContext('2d');
    clearDrawCanvas(lesson);
    let x = cv.width/2, y = cv.height/2, angle = 0, color = '#D6467F';
    ctx.lineWidth = 3; ctx.lineCap = 'round';
    msgEl.textContent=''; msgEl.className='a-message';
    for(const op of ops){
      if(op.op === 'color'){ color = op.value; await delay(30); }
      else if(op.op === 'turn'){ angle = (angle + (op.deg||0)) % 360; await delay(30); }
      else if(op.op === 'forward'){
        const dist = Math.max(0, Math.min(300, op.dist||0));
        const nx = x + dist*Math.sin(angle*Math.PI/180);
        const ny = y - dist*Math.cos(angle*Math.PI/180);
        ctx.strokeStyle = color;
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(nx,ny); ctx.stroke();
        x = nx; y = ny;
        await delay(90);
      }
    }
    msgEl.textContent = '🎉 ' + lesson.successMsg; msgEl.className='a-message ok';
    nextBtn.disabled = false;
  }

  /* ---------- Chapter 10: Game maker (playable catch game) ---------- */
  let gameRAF = null, gameKeyHandler = null, gameHeld = null;

  function stopGame(){
    if(gameRAF){ cancelAnimationFrame(gameRAF); gameRAF = null; }
    if(gameKeyHandler){ document.removeEventListener('keydown', gameKeyHandler.down); document.removeEventListener('keyup', gameKeyHandler.up); gameKeyHandler = null; }
    gameHeld = null;
  }

  function renderGameBlanks(lesson){
    const stage = container.querySelector('#bGameCode'); stage.innerHTML='';
    lesson.codeLines.forEach(lineStr => {
      const lineEl = document.createElement('div'); lineEl.className='b-code-line';
      const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
      parts.forEach(part => {
        const m = part.match(/^\{\{(\w+)\}\}$/);
        if(m){
          const blank = lesson.blanks.find(b=>b.id===m[1]);
          const inp = document.createElement('input');
          inp.type='number'; inp.className='b-blank-input'; inp.dataset.id=blank.id; inp.placeholder='?';
          lineEl.appendChild(inp);
        } else {
          const span = document.createElement('span'); span.className='b-code-text'; span.textContent=part;
          lineEl.appendChild(span);
        }
      });
      stage.appendChild(lineEl);
    });
  }

  function drawGameIdle(lesson){
    const cv = container.querySelector('#bGameCanvas');
    if(!cv) return;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#1B1B3A'; ctx.fillRect(0,0,cv.width,cv.height);
    ctx.font = '14px Nunito, sans-serif'; ctx.fillStyle = '#DCDCF5'; ctx.textAlign = 'center';
    ctx.fillText('Настрой кода и натисни „Играй!“', cv.width/2, cv.height/2);
  }

  async function startGame(lesson, msgEl, nextBtn){
    const codeEl = container.querySelector('#bGameCode');
    let allFilled = true; const values = {};
    lesson.blanks.forEach(b => {
      const el = codeEl.querySelector(`[data-id="${b.id}"]`);
      const val = (el.value||'').trim();
      if(val==='') allFilled=false;
      values[b.id] = val;
    });
    if(!allFilled){ msgEl.textContent='✏️ Попълни всички стойности в кода първо.'; msgEl.className='a-message bad'; return; }
    stopGame();
    const cfg = lesson.compile(values);
    const cv = container.querySelector('#bGameCanvas');
    const ctx = cv.getContext('2d');
    const scoreEl = container.querySelector('#bGameScore');
    scoreEl.style.display = 'block';
    msgEl.textContent = ''; msgEl.className = 'a-message';
    nextBtn.disabled = true;

    const W = cv.width, H = cv.height;
    let basketX = W/2, basketW = 46, basketY = lesson.game.basketY;
    let score = 0, running = true, lastSpawn = 0;
    const items = [];

    gameHeld = null;
    const leftBtn = container.querySelector('#bGameLeft');
    const rightBtn = container.querySelector('#bGameRight');
    const setHeld = (dir) => { gameHeld = dir; };
    const clearHeld = () => { gameHeld = null; };
    ['mousedown','touchstart'].forEach(ev => { leftBtn.addEventListener(ev, ()=>setHeld('left')); rightBtn.addEventListener(ev, ()=>setHeld('right')); });
    ['mouseup','mouseleave','touchend'].forEach(ev => { leftBtn.addEventListener(ev, clearHeld); rightBtn.addEventListener(ev, clearHeld); });
    gameKeyHandler = {
      down:(e) => { if(e.key==='ArrowLeft') gameHeld='left'; if(e.key==='ArrowRight') gameHeld='right'; },
      up:(e) => { if(e.key==='ArrowLeft' || e.key==='ArrowRight') gameHeld=null; }
    };
    document.addEventListener('keydown', gameKeyHandler.down);
    document.addEventListener('keyup', gameKeyHandler.up);

    function spawnItem(){
      const isRock = Math.random()*100 < (cfg.rockChance||0);
      items.push({ x: 20+Math.random()*(W-40), y: -10, isRock, speed: 1.2 + cfg.speed*0.5 });
    }

    function frame(ts){
      if(!running) return;
      ctx.fillStyle = '#1B1B3A'; ctx.fillRect(0,0,W,H);

      if(gameHeld==='left') basketX = Math.max(basketW/2, basketX - 5);
      if(gameHeld==='right') basketX = Math.min(W-basketW/2, basketX + 5);

      if(!lastSpawn || ts - lastSpawn > Math.max(350, 1000 - cfg.speed*90)){ spawnItem(); lastSpawn = ts; }

      for(let i=items.length-1; i>=0; i--){
        const it = items[i];
        it.y += it.speed;
        ctx.font = '20px sans-serif'; ctx.textAlign='center';
        ctx.fillText(it.isRock ? '🪨' : '⭐', it.x, it.y);
        if(it.y > basketY-10 && it.y < basketY+16 && Math.abs(it.x-basketX) < basketW/2+8){
          if(it.isRock){ score = Math.max(0, score-1); } else { score += 1; }
          items.splice(i,1);
        } else if(it.y > H+10){
          items.splice(i,1);
        }
      }

      ctx.font = '28px sans-serif'; ctx.textAlign='center';
      ctx.fillText('🧺', basketX, basketY+22);

      scoreEl.textContent = `⭐ ${score} / ${cfg.winScore}`;

      if(score >= cfg.winScore){
        running = false; stopGame();
        msgEl.textContent = '🎉 ' + lesson.successMsg; msgEl.className='a-message ok';
        nextBtn.disabled = false;
        return;
      }
      gameRAF = requestAnimationFrame(frame);
    }
    gameRAF = requestAnimationFrame(frame);
  }

  function renderExerciseStage(lesson, ex){
    const stage = container.querySelector('#bStage'); stage.innerHTML='';
    if(lesson.type === 'blanks'){
      ex.codeLines.forEach(lineStr => {
        const lineEl = document.createElement('div'); lineEl.className='b-code-line';
        const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
        parts.forEach(part => {
          const m = part.match(/^\{\{(\w+)\}\}$/);
          if(m){
            const blank = ex.blanks.find(b=>b.id===m[1]);
            if(blank.kind==='number'){
              const inp = document.createElement('input');
              inp.type='number'; inp.className='b-blank-input'; inp.dataset.id=blank.id; inp.placeholder='?';
              lineEl.appendChild(inp);
            } else {
              const sel = document.createElement('select');
              sel.className='b-blank-select'; sel.dataset.id=blank.id;
              const def = document.createElement('option'); def.value=''; def.textContent='— избери —';
              sel.appendChild(def);
              blank.options.forEach(o => { const opt=document.createElement('option'); opt.value=o.value; opt.textContent=o.label; sel.appendChild(opt); });
              lineEl.appendChild(sel);
            }
          } else {
            const span = document.createElement('span'); span.className='b-code-text'; span.textContent=part;
            lineEl.appendChild(span);
          }
        });
        stage.appendChild(lineEl);
      });
    } else if(lesson.type === 'order'){
      orderState = [];
      const poolTitle = document.createElement('div'); poolTitle.className='b-code-line';
      poolTitle.innerHTML = '<span class="b-code-text" style="color:#C9BFFF;">// избери реда, в който да поставиш командите:</span>';
      stage.appendChild(poolTitle);
      const answer = document.createElement('div'); answer.className='b-chip-answer'; answer.id='bChipAnswer';
      const pool = document.createElement('div'); pool.className='b-chip-pool'; pool.id='bChipPool';
      stage.appendChild(answer); stage.appendChild(pool);
      renderChips(ex);
    }
  }


  function renderWorked(lesson, el){
    el.innerHTML='';
    if(lesson.type === 'blanks'){
      lesson.codeLines.forEach(lineStr => {
        const lineEl = document.createElement('div'); lineEl.className='b-code-line';
        const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
        parts.forEach(part => {
          const m = part.match(/^\{\{(\w+)\}\}$/);
          if(m){
            const blank = lesson.blanks.find(b=>b.id===m[1]);
            const span = document.createElement('span'); span.className='worked-badge';
            if(blank.kind==='select'){
              const opt = blank.options.find(o=>o.value===String(blank.correct));
              span.textContent = opt ? opt.label : blank.correct;
            } else { span.textContent = blank.correct; }
            lineEl.appendChild(span);
          } else {
            const span = document.createElement('span'); span.className='b-code-text'; span.textContent=part;
            lineEl.appendChild(span);
          }
        });
        el.appendChild(lineEl);
      });
    } else if(lesson.type === 'order'){
      lesson.correctOrder.forEach((id,i) => {
        const c = lesson.chips.find(x=>x.id===id);
        const lineEl = document.createElement('div'); lineEl.className='b-code-line';
        lineEl.innerHTML = `<span class="worked-badge">${i+1}</span><span class="b-code-text">${c.label}</span>`;
        el.appendChild(lineEl);
      });
    }
  }

  function renderChips(lesson){
    const pool = container.querySelector('#bChipPool');
    const answer = container.querySelector('#bChipAnswer');
    pool.innerHTML='';
    lesson.chips.forEach(c => {
      if(orderState.includes(c.id)) return;
      const chip = document.createElement('button'); chip.className='b-chip'; chip.textContent=c.label;
      chip.onclick = () => { orderState.push(c.id); renderChips(lesson); };
      pool.appendChild(chip);
    });
    answer.innerHTML='';
    if(orderState.length===0){ answer.innerHTML = '<span class="b-empty-hint">Натисни командите отдолу в правилния ред</span>'; }
    else {
      orderState.forEach((id,i) => {
        const c = lesson.chips.find(x=>x.id===id);
        const chip = document.createElement('button'); chip.className='b-chip placed'; chip.textContent=(i+1)+'. '+c.label;
        chip.onclick = () => { orderState.splice(i,1); renderChips(lesson); };
        answer.appendChild(chip);
      });
    }
  }

  function checkExercise(lesson, ex){
    const msg = container.querySelector('#bMsg');
    let success = false;
    if(lesson.type === 'blanks'){
      let allRight = true;
      ex.blanks.forEach(b => {
        const el = container.querySelector(`#bStage [data-id="${b.id}"]`);
        const val = (el.value||'').trim();
        const ok = val!=='' && val===String(b.correct).trim();
        el.classList.toggle('right', ok); el.classList.toggle('wrong', !ok);
        if(!ok) allRight=false;
      });
      success = allRight;
    } else if(lesson.type === 'order'){
      success = orderState.length===ex.correctOrder.length && orderState.every((id,i)=> id===ex.correctOrder[i]);
    }
    if(success){
      let extra = '';
      if(ex.resultCountId){
        const el = container.querySelector(`#bStage [data-id="${ex.resultCountId}"]`);
        const n = Math.min(parseInt(el.value,10)||0, 12);
        extra = ' ' + (ex.resultEmoji||'⭐').repeat(n);
      }
      msg.textContent = '🎉 ' + ex.successMsg + extra; msg.className='b-message ok';
      container.querySelector('#stepNextBtn').disabled = false;
    } else {
      msg.innerHTML = `🤔 <strong>Не съвсем.</strong> ${lesson.fact}<br>Помисли отново върху обяснението, преди да пробваш пак.`;
      msg.className='b-message bad';
      const checkBtn = container.querySelector('#bCheck');
      const resetBtn = container.querySelector('#bReset');
      const fields = Array.from(container.querySelectorAll('#bStage [data-id]'));
      startLockout(msg, 10, [checkBtn, resetBtn, ...fields]);
    }
  }

  function startLockout(msgEl, seconds, elsToDisable){
    let remaining = seconds;
    const baseHTML = msgEl.innerHTML;
    elsToDisable.forEach(el => { if(el) el.disabled = true; });
    const tick = () => {
      msgEl.innerHTML = baseHTML + `<br><span class="lockout-timer">⏳ Можеш да пробваш пак след ${remaining} сек...</span>`;
      remaining--;
      if(remaining < 0){
        clearInterval(iv);
        elsToDisable.forEach(el => { if(el) el.disabled = false; });
        msgEl.innerHTML = baseHTML + `<br><span class="lockout-timer" style="color:var(--ok);">✏️ Пробвай сега!</span>`;
      }
    };
    tick();
    const iv = setInterval(tick, 1000);
  }

  let reviewQueue = [], reviewIdx = 0, reviewCorrect = 0;

  function startReview(){
    stopGame();
    const completed = lessons.map((l,i)=>i).filter(i => state.stars[i]);
    if(completed.length === 0){
      alert('Все още няма завършени уроци за преговор. Довърши поне един урок и се върни тук!');
      return;
    }
    reviewQueue = completed.slice().sort(() => Math.random()-0.5).slice(0, Math.min(8, completed.length));
    reviewIdx = 0; reviewCorrect = 0;
    renderReviewQuestion();
  }

  function renderReviewQuestion(){
    const prog = container.querySelector('#bStepProgress');
    prog.innerHTML = `<span class="step-caption">🔄 Преговор: въпрос ${reviewIdx+1} от ${reviewQueue.length}</span>`;
    const left = container.querySelector('#bLeftCol');
    const right = container.querySelector('#bRightCol');
    const panel = container.querySelector('#bPanel');
    right.innerHTML=''; right.style.display='none'; panel.classList.add('single-col');
    const lesson = lessons[reviewQueue[reviewIdx]];
    const q = buildQuiz(lesson, reviewQueue[reviewIdx]);
    left.innerHTML = `<div class="step-kicker">Бърз преговор</div>
      <h3><span class="b-mascot-icon">${lesson.mascot}</span>Урок ${lesson.id}: ${lesson.title}</h3>
      <button class="audio-btn" id="reviewAudioBtn" style="margin-bottom:10px;">🔊 Слушай</button>
      <div class="quiz-question">Кое от следните е вярно?</div>
      <div id="reviewOpts"></div>
      <div class="b-message" id="reviewMsg" role="status"></div>`;
    container.querySelector('#reviewAudioBtn').addEventListener('click', () => speakText(lesson.fact));
    const optsWrap = container.querySelector('#reviewOpts');
    const msgEl = container.querySelector('#reviewMsg');
    q.options.forEach(opt => {
      const btn = document.createElement('button'); btn.className='quiz-opt'; btn.textContent=opt;
      btn.onclick = () => {
        const isRight = opt === q.correct;
        if(isRight){
          btn.classList.add('right'); reviewCorrect++;
          msgEl.textContent = '🎉 Точно!'; msgEl.className='b-message ok';
          optsWrap.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
          setTimeout(() => { reviewIdx++; if(reviewIdx>=reviewQueue.length) renderReviewSummary(); else renderReviewQuestion(); }, 1000);
        } else {
          btn.classList.add('wrong'); btn.disabled = true;
          msgEl.innerHTML = `🤔 <strong>Не точно.</strong> ${lesson.fact}`;
          msgEl.className = 'b-message bad';
          const others = Array.from(optsWrap.querySelectorAll('.quiz-opt')).filter(b=>!b.classList.contains('wrong'));
          startLockout(msgEl, 10, others);
        }
      };
      optsWrap.appendChild(btn);
    });
  }

  function renderReviewSummary(){
    const prog = container.querySelector('#bStepProgress'); prog.innerHTML = '';
    const left = container.querySelector('#bLeftCol');
    const ratio = reviewCorrect / reviewQueue.length;
    const praise = ratio === 1 ? '🌟 Перфектно! Помниш всичко отлично!' : ratio >= 0.6 ? '👏 Много добре, продължавай да учиш!' : '💪 Добро начало — повтарянето прави майстора!';
    left.innerHTML = `<div class="complete-card">
        <div class="big-star">🔄⭐</div>
        <h3>Преговорът приключи!</h3>
        <p class="b-story">Позна ${reviewCorrect} от ${reviewQueue.length} въпроса. ${praise}</p>
        <div class="step-nav" style="justify-content:center;">
          <button class="step-next" id="reviewBackBtn">Обратно към уроците →</button>
        </div>
      </div>`;
    container.querySelector('#reviewBackBtn').addEventListener('click', () => loadLesson());
  }

  return { mount, defaultUnlocked, defaultStars, stopGame };
})();
