import type { Template } from '../../templates'

// The printed card's pages in every language but Gujarati: same pages, same sections, same marks; only the words change.
const tr: NonNullable<Template['tr']> = {
  en: [
    { title: 'Dholakiya Family', sections: [{ heading: '', body: '*Dholakiya*' }, { heading: '', body: '*Family*' }] },
    {
      title: 'Auspicious Wedding',
      sections: [
        { heading: '', body: '|| Shri Ganeshaya Namah ||' },
        { heading: '', body: '[[2-ganesh]]' },
        { heading: '', body: '[[2-title|**Auspicious Wedding**]]' },
        { heading: '', body: '<<*Chi. Jenish*' },
        { heading: '', body: '[[2-hands|weds]]' },
        { heading: '', body: '>>*Chi. Anjali*' },
        { heading: '', body: '[[2-date|Friday, 25/11/2022]]' },
        { heading: '', body: '[[2-shriman|*Dear* ____________________________]]' },
        { heading: '', body: '[[2-nimantrak||| Invited By ||]]' },
        {
          heading: '',
          body: '*Shri Vinubhai Premjibhai Dholakiya*\n*Shri Sanjaybhai Premjibhai Dholakiya*\n*B-117 Adarshnagar Society Vi-2,*\n*Chhaprabhatha Road, Amroli, Surat.*\n*Mo. 98765 43210 - 91234 56789*',
        },
      ],
    },
    { title: 'The Couple', sections: [] },
    {
      title: 'Auspicious Ceremonies',
      sections: [
        { heading: '', body: '|| Shri Ganeshaya Namah ||' },
        { heading: '', body: '[[4-ganesh]]' },
        { heading: '', body: '**|| Auspicious Ceremonies ||**\n[[4-flourish]]' },
        { heading: '', body: '[[4-mandap|Mandap Muhurat]]' },
        { heading: '', body: 'Thursday, 24/11/2022\nat 1:00 PM\nSmt. Sonalben Sanjaybhai Dholakiya\nSmt. Kajalben Nileshbhai Dholakiya' },
        {
          heading: '[[4-swaruchi|Dinner]]',
          body: 'Thursday, 24/11/2022\nat 6:00 PM\nYou are welcome with *all* your family.\nSmt. Nitaben Nareshbhai Dholakiya\nSmt. Manjulaben Rameshbhai Dholakiya\nVenue: Madhavanand Ashram, Ram Katha Road,\nAmba Talavdi, Katargam.',
        },
        {
          heading: '[[4-jaan|Baraat Departure]]',
          body: 'Friday, 25/11/2022\nat 4:00 PM\nYou are welcome with *all* your family.\nSmt. Rekhaben Rajeshbhai Dholakiya\nSmt. Komalben Jitendrabhai Dholakiya\nVenue: 22, Aparna Society, Ram Katha Road,\nAmba Talavdi, Katargam.',
        },
        { heading: '', body: '[[4-hast|Hastmelap]]' },
        { heading: '', body: 'Friday, 25/11/2022\nat 9:00 PM.' },
        { heading: '', body: '[[4-mitho|Sweet Words]]' },
        {
          heading: '',
          body: 'We long for your warm blessings and cherish your loving good wishes,\nand we hope for your heartfelt presence...\n*- Vishwa, Sneh, Aarav, Krishna, Dhyani, Aadhya.*',
        },
      ],
    },
    {
      title: 'Wedding Celebration',
      sections: [
        { heading: '', body: '|| Shubh || <> || Shri Rajrajeshwari Butbhavani Mataji || <> || Labh ||' },
        { heading: '', body: '[[5-mataji]]' },
        { heading: '', body: '**|| Wedding Celebration ||**\n[[5-flourish]]' },
        {
          heading: '',
          body: 'Dear Shri,..............................................\nWith great joy we share that, by the boundless grace of our Kuldevi Shri Rajrajeshwari Butbhavani Mataji,\nof Ghughrala (now Surat)\nthe son of Smt. Bhavnaben and Shri Vinubhai Premjibhai Dholakiya',
        },
        { heading: '', body: '<<*Chi. Jenish*' },
        { heading: '', body: '[[5-hands|weds]]' },
        { heading: '', body: '>>*Chi. Anjali*' },
        {
          heading: '',
          body: 'of Damnagar (now Surat)\nthe daughter of Smt. Rekhaben and Shri Jaysukhbhai Vallabhbhai Narola\nwill be wed on Friday, Magshar Sud 2, Samvat 2079 (25-11-2022). On this\nauspicious day, as the couple steps into married life, we warmly invite you\nto bless the newlyweds and share in our joy. Please grace\nthe occasion with your presence...',
        },
        { heading: '[[5-lagna|Wedding Venue]]', body: 'Shri Jaysukhbhai Vallabhbhai Narola\nMadhavanand Ashram, Ram Katha Road,\nAmba Talavdi, Surat.' },
        { heading: '[[5-shubh|Residence]]', body: 'Shri Vinubhai Premjibhai Dholakiya\nB-117 Adarshnagar Society Vi-2,\nChhaprabhatha Road, Amroli, Surat.' },
      ],
    },
    {
      title: 'Loving Family',
      sections: [
        { heading: '', body: '|| Shubh || <> || Labh ||' },
        { heading: '', body: '**|| Loving Family ||**\n[[6-flourish]]' },
        { heading: '', body: '[[6-divya|Divine Blessings]]' },
        { heading: '', body: 'Late Monghiben Dhanjibhai Dholakiya\nLate Dhanjibhai Shambhubhai Dholakiya' },
        { heading: '', body: '[[6-sneh|With Love]]' },
        {
          heading: '',
          body: 'Late Premjibhai Dhanjibhai Dholakiya\nLate Babubhai Dhanjibhai Dholakiya\nLate Bhupatbhai Dhanjibhai Dholakiya\nShri Himmatbhai Dhanjibhai Dholakiya\nShri Laljibhai Lavjibhai Dholakiya\nLate Mithabhai Shambhubhai Dholakiya\nLate Vashrambhai Shambhubhai Dholakiya\nShri Lavabhai Shambhubhai Dholakiya\nShri Ukabhai Mithabhai Dholakiya\nShri Chhaganbhai Vashrambhai Dholakiya',
        },
        { heading: '', body: 'Jay Swaminarayan from our mother Lilaba' },
        { heading: '', body: '[[6-avsar|Eagerly Awaiting]]' },
        {
          heading: '',
          body: 'Shri Sanjaybhai Premjibhai Dholakiya\nShri Rameshbhai Babubhai Dholakiya\nShri Nareshbhai Babubhai Dholakiya\nShri Rajeshbhai Babubhai Dholakiya\nShri Nileshbhai Bhupatbhai Dholakiya\nShri Jitendrabhai Himmatbhai Dholakiya\nShri Kenil Vinubhai Dholakiya\nShri Sneh Sanjaybhai Dholakiya\nShri Krushant Rameshbhai Dholakiya\nShri Vinit Rameshbhai Dholakiya\nShri Divyesh Nareshbhai Dholakiya\nShri Prince Rajeshbhai Dholakiya\nShri Neel Nareshbhai Dholakiya\nShri Dharm Jitendrabhai Dholakiya\nShri Naitikbhai Nileshbhai Dholakiya',
        },
        { heading: '', body: '[[6-mosal|Maternal Family]]' },
        { heading: '', body: 'Shri Nareshbhai Bholabhai Nadoda\n(Chital)' },
        { heading: '', body: '[[6-bhanej|Nephews]]' },
        { heading: '', body: 'Shri Roshan Bipinbhai Shankar\n(Lathi)' },
      ],
    },
    { title: 'Cherished Moments', sections: [] },
    {
      title: 'Invitation',
      sections: [
        { heading: '', body: '*Dholakiya*' },
        { heading: '', body: '>>*Family*' },
        {
          heading: '',
          body: '***Dear Shri,***\nPlease treat this digital card as a personal visit\nand grace our auspicious wedding with your presence.\nKindly reply ***OK*** after reading this card.',
        },
      ],
    },
  ],
  hi: [
    { title: 'धोलकिया परिवार', sections: [{ heading: '', body: '*धोलकिया*' }, { heading: '', body: '*परिवार*' }] },
    {
      title: 'शुभ परिणयोत्सव',
      sections: [
        { heading: '', body: '॥ श्री गणेशाय नमः ॥' },
        { heading: '', body: '[[2-ganesh]]' },
        { heading: '', body: '[[2-title|**शुभ परिणयोत्सव**]]' },
        { heading: '', body: '<<*चि. जेनिश*' },
        { heading: '', body: '[[2-hands|का शुभ विवाह]]' },
        { heading: '', body: '>>*चि. अंजलि*' },
        { heading: '', body: '[[2-date|शुक्रवार, दि. 25/11/2022]]' },
        { heading: '', body: '[[2-shriman|*श्रीमान* ____________________________]]' },
        { heading: '', body: '[[2-nimantrak|॥ निमंत्रक ॥]]' },
        {
          heading: '',
          body: '*श्री विनुभाई प्रेमजीभाई धोलकिया*\n*श्री संजयभाई प्रेमजीभाई धोलकिया*\n*बी-117 आदर्शनगर सोसाइटी वि-2,*\n*छापराभाठा रोड, अमरोली, सूरत.*\n*मो. 98765 43210 - 91234 56789*',
        },
      ],
    },
    { title: 'हमारी जोड़ी', sections: [] },
    {
      title: 'मांगलिक प्रसंग',
      sections: [
        { heading: '', body: '॥ श्री गणेशाय नमः ॥' },
        { heading: '', body: '[[4-ganesh]]' },
        { heading: '', body: '**॥ मांगलिक प्रसंग ॥**\n[[4-flourish]]' },
        { heading: '', body: '[[4-mandap|मंडप मुहूर्त]]' },
        { heading: '', body: 'गुरुवार, दि. 24/11/2022\nको दोपहर 01:00 बजे\nश्रीमती सोनलबेन संजयभाई धोलकिया\nश्रीमती काजलबेन निलेशभाई धोलकिया' },
        {
          heading: '[[4-swaruchi|स्वरुचि भोज]]',
          body: 'गुरुवार, दि. 24/11/2022\nको शाम 06:00 बजे\nआप *सपरिवार* पधारें।\nश्रीमती नीताबेन नरेशभाई धोलकिया\nश्रीमती मंजुलाबेन रमेशभाई धोलकिया\nस्थान : माधवानंद आश्रम, राम कथा रोड,\nआंबा तलावड़ी, कतारगाम.',
        },
        {
          heading: '[[4-jaan|बारात प्रस्थान]]',
          body: 'शुक्रवार, दि. 25/11/2022\nको शाम 04:00 बजे\nआप *सपरिवार* पधारें।\nश्रीमती रेखाबेन राजेशभाई धोलकिया\nश्रीमती कोमलबेन जितेंद्रभाई धोलकिया\nस्थान : 22, अपर्णा सोसाइटी, राम कथा रोड,\nआंबा तलावड़ी, कतारगाम.',
        },
        { heading: '', body: '[[4-hast|शुभ हस्तमिलाप]]' },
        { heading: '', body: 'शुक्रवार, दि. 25/11/2022\nको रात्रि 9:00 बजे।' },
        { heading: '', body: '[[4-mitho|मीठी पुकार]]' },
        {
          heading: '',
          body: 'चाह है आपके स्नेहभरे आशीर्वाद की, भावना है आपकी प्रेमभरी शुभकामनाओं की\nअपेक्षा है आपकी हृदयपूर्वक उपस्थिति की...\n*- विश्वा, स्नेह, आरव, कृष्णा, ध्यानी, आध्या.*',
        },
      ],
    },
    {
      title: 'परिणय महोत्सव',
      sections: [
        { heading: '', body: '॥ शुभ ॥ <> ॥ श्री राजराजेश्वरी बुटभवानी माताजी ॥ <> ॥ लाभ ॥' },
        { heading: '', body: '[[5-mataji]]' },
        { heading: '', body: '**॥ परिणय महोत्सव ॥**\n[[5-flourish]]' },
        {
          heading: '',
          body: 'स्नेही स्वजन श्री,..............................................\nसहर्ष सूचित करते हैं कि हमारी कुलदेवी श्री राजराजेश्वरी बुटभवानी माताजी की असीम कृपा से\nघुघराला निवासी (हाल सूरत)\nश्रीमती भावनाबेन एवं श्री विनुभाई प्रेमजीभाई धोलकिया के सुपुत्र',
        },
        { heading: '', body: '<<*चि. जेनिश*' },
        { heading: '', body: '[[5-hands|का शुभ विवाह]]' },
        { heading: '', body: '>>*चि. अंजलि*' },
        {
          heading: '',
          body: 'दामनगर निवासी (हाल सूरत)\nश्रीमती रेखाबेन एवं श्री जयसुखभाई वल्लभभाई नारोला की सुपुत्री\nके साथ संवत 2079 मार्गशीर्ष शुक्ल 2, शुक्रवार दि. 25-11-2022 के शुभ दिन तोरण\nनिश्चित हुआ है। इस शुभ अवसर पर गृहस्थ जीवन में पग रखते नवदंपति को आशीर्वाद देने\nऔर हमारे आनंद में सहभागी होने के लिए आपको भावभरा आमंत्रण है। इस शुभ प्रसंग पर\nपधारकर हमारे उत्सव की शोभा बढ़ाएँ...',
        },
        { heading: '[[5-lagna|विवाह स्थल]]', body: 'श्री जयसुखभाई वल्लभभाई नारोला\nमाधवानंद आश्रम, राम कथा रोड,\nआंबा तलावड़ी, सूरत.' },
        { heading: '[[5-shubh|शुभ स्थान]]', body: 'श्री विनुभाई प्रेमजीभाई धोलकिया\nबी-117 आदर्शनगर सोसाइटी वि-2,\nछापराभाठा रोड, अमरोली, सूरत.' },
      ],
    },
    {
      title: 'स्नेही स्वजन',
      sections: [
        { heading: '', body: '॥ शुभ ॥ <> ॥ लाभ ॥' },
        { heading: '', body: '**॥ स्नेही स्वजन ॥**\n[[6-flourish]]' },
        { heading: '', body: '[[6-divya|दिव्य आशीर्वाद]]' },
        { heading: '', body: 'स्व. मोंघीबेन धनजीभाई धोलकिया\nस्व. धनजीभाई शंभूभाई धोलकिया' },
        { heading: '', body: '[[6-sneh|स्नेहाधीन]]' },
        {
          heading: '',
          body: 'स्व. प्रेमजीभाई धनजीभाई धोलकिया\nस्व. बाबूभाई धनजीभाई धोलकिया\nस्व. भूपतभाई धनजीभाई धोलकिया\nश्री हिम्मतभाई धनजीभाई धोलकिया\nश्री लालजीभाई लवजीभाई धोलकिया\nस्व. मीठाभाई शंभूभाई धोलकिया\nस्व. वशरामभाई शंभूभाई धोलकिया\nश्री लवाभाई शंभूभाई धोलकिया\nश्री उकाभाई मीठाभाई धोलकिया\nश्री छगनभाई वशरामभाई धोलकिया',
        },
        { heading: '', body: 'हमारी मातुश्री लीलाबा के जय स्वामिनारायण' },
        { heading: '', body: '[[6-avsar|दर्शनाभिलाषी]]' },
        {
          heading: '',
          body: 'श्री संजयभाई प्रेमजीभाई धोलकिया\nश्री रमेशभाई बाबूभाई धोलकिया\nश्री नरेशभाई बाबूभाई धोलकिया\nश्री राजेशभाई बाबूभाई धोलकिया\nश्री निलेशभाई भूपतभाई धोलकिया\nश्री जितेंद्रभाई हिम्मतभाई धोलकिया\nश्री केनिल विनुभाई धोलकिया\nश्री स्नेह संजयभाई धोलकिया\nश्री कृषांत रमेशभाई धोलकिया\nश्री विनीत रमेशभाई धोलकिया\nश्री दिव्येश नरेशभाई धोलकिया\nश्री प्रिंस राजेशभाई धोलकिया\nश्री नील नरेशभाई धोलकिया\nश्री धर्म जितेंद्रभाई धोलकिया\nश्री नैतिकभाई निलेशभाई धोलकिया',
        },
        { heading: '', body: '[[6-mosal|ननिहाल पक्ष]]' },
        { heading: '', body: 'श्री नरेशभाई भोलाभाई नाडोदा\n(चितल)' },
        { heading: '', body: '[[6-bhanej|भांजा पक्ष]]' },
        { heading: '', body: 'श्री रोशन बिपिनभाई शंकर\n(लाठी)' },
      ],
    },
    { title: 'यादगार पल', sections: [] },
    {
      title: 'आमंत्रण',
      sections: [
        { heading: '', body: '*धोलकिया*' },
        { heading: '', body: '>>*परिवार*' },
        {
          heading: '',
          body: '***स्नेही स्वजन श्री,***\nइस डिजिटल कार्ड को व्यक्तिगत भेंट समान समझकर\nहमारे आँगन में आए शुभ विवाह प्रसंग में पधारें।\nस्नेही श्री, यह कार्ड पढ़कर ***OK*** का उत्तर संदेश भेजने का अनुरोध है।',
        },
      ],
    },
  ],
  mr: [
    { title: 'धोलकिया परिवार', sections: [{ heading: '', body: '*धोलकिया*' }, { heading: '', body: '*परिवार*' }] },
    {
      title: 'शुभ परिणयोत्सव',
      sections: [
        { heading: '', body: '॥ श्री गणेशाय नमः ॥' },
        { heading: '', body: '[[2-ganesh]]' },
        { heading: '', body: '[[2-title|**शुभ परिणयोत्सव**]]' },
        { heading: '', body: '<<*चि. जेनिश*' },
        { heading: '', body: '[[2-hands|यांचा शुभविवाह]]' },
        { heading: '', body: '>>*चि.सौ.कां. अंजली*' },
        { heading: '', body: '[[2-date|शुक्रवार, दि. २५/११/२०२२]]' },
        { heading: '', body: '[[2-shriman|*श्रीमान* ____________________________]]' },
        { heading: '', body: '[[2-nimantrak|॥ निमंत्रक ॥]]' },
        {
          heading: '',
          body: '*श्री. विनुभाई प्रेमजीभाई धोलकिया*\n*श्री. संजयभाई प्रेमजीभाई धोलकिया*\n*बी-११७ आदर्शनगर सोसायटी वि-२,*\n*छापराभाठा रोड, अमरोली, सुरत.*\n*मो. ९८७६५ ४३२१० - ९१२३४ ५६७८९*',
        },
      ],
    },
    { title: 'आमची जोडी', sections: [] },
    {
      title: 'मंगल कार्यक्रम',
      sections: [
        { heading: '', body: '॥ श्री गणेशाय नमः ॥' },
        { heading: '', body: '[[4-ganesh]]' },
        { heading: '', body: '**॥ मंगल कार्यक्रम ॥**\n[[4-flourish]]' },
        { heading: '', body: '[[4-mandap|मंडप मुहूर्त]]' },
        { heading: '', body: 'गुरुवार, दि. २४/११/२०२२\nरोजी दुपारी ०१:०० वाजता\nसौ. सोनलबेन संजयभाई धोलकिया\nसौ. काजलबेन निलेशभाई धोलकिया' },
        {
          heading: '[[4-swaruchi|स्नेहभोजन]]',
          body: 'गुरुवार, दि. २४/११/२०२२\nरोजी सायंकाळी ०६:०० वाजता\nआपण *सहकुटुंब* उपस्थित राहावे.\nसौ. नीताबेन नरेशभाई धोलकिया\nसौ. मंजुलाबेन रमेशभाई धोलकिया\nस्थळ : माधवानंद आश्रम, राम कथा रोड,\nआंबा तलावडी, कतारगाम.',
        },
        {
          heading: '[[4-jaan|वरात प्रस्थान]]',
          body: 'शुक्रवार, दि. २५/११/२०२२\nरोजी सायंकाळी ०४:०० वाजता\nआपण *सहकुटुंब* उपस्थित राहावे.\nसौ. रेखाबेन राजेशभाई धोलकिया\nसौ. कोमलबेन जितेंद्रभाई धोलकिया\nस्थळ : २२, अपर्णा सोसायटी, राम कथा रोड,\nआंबा तलावडी, कतारगाम.',
        },
        { heading: '', body: '[[4-hast|शुभ हस्तमिलाप]]' },
        { heading: '', body: 'शुक्रवार, दि. २५/११/२०२२\nरोजी रात्री ९:०० वाजता.' },
        { heading: '', body: '[[4-mitho|गोड हाक]]' },
        {
          heading: '',
          body: 'ओढ आहे आपल्या प्रेमळ आशीर्वादांची, भावना आहे आपल्या स्नेहपूर्ण शुभेच्छांची\nअपेक्षा आहे आपल्या मनःपूर्वक उपस्थितीची...\n*- विश्वा, स्नेह, आरव, कृष्णा, ध्यानी, आध्या.*',
        },
      ],
    },
    {
      title: 'परिणय महोत्सव',
      sections: [
        { heading: '', body: '॥ शुभ ॥ <> ॥ श्री राजराजेश्वरी बुटभवानी माताजी ॥ <> ॥ लाभ ॥' },
        { heading: '', body: '[[5-mataji]]' },
        { heading: '', body: '**॥ परिणय महोत्सव ॥**\n[[5-flourish]]' },
        {
          heading: '',
          body: 'स्नेही स्वजन श्री,..............................................\nकळविण्यास अत्यंत आनंद होतो की आमची कुलदेवी श्री राजराजेश्वरी बुटभवानी माताजी यांच्या असीम कृपेने\nघुघराला निवासी (सध्या सुरत)\nसौ. भावनाबेन व श्री. विनुभाई प्रेमजीभाई धोलकिया यांचे सुपुत्र',
        },
        { heading: '', body: '<<*चि. जेनिश*' },
        { heading: '', body: '[[5-hands|यांचा शुभविवाह]]' },
        { heading: '', body: '>>*चि.सौ.कां. अंजली*' },
        {
          heading: '',
          body: 'दामनगर निवासी (सध्या सुरत)\nसौ. रेखाबेन व श्री. जयसुखभाई वल्लभभाई नारोला यांची सुकन्या\nहिच्याशी शके संवत २०७९ मार्गशीर्ष शुद्ध २, शुक्रवार दि. २५-११-२०२२ या शुभदिनी\nनिश्चित झाला आहे. या शुभप्रसंगी संसारात पाऊल ठेवणाऱ्या नवदांपत्याला आशीर्वाद देण्यासाठी\nआणि आमच्या आनंदात सहभागी होण्यासाठी आपणास सस्नेह निमंत्रण. या मंगलप्रसंगी\nआपण उपस्थित राहून आमच्या आनंदात भर घालावी...',
        },
        { heading: '[[5-lagna|विवाह स्थळ]]', body: 'श्री. जयसुखभाई वल्लभभाई नारोला\nमाधवानंद आश्रम, राम कथा रोड,\nआंबा तलावडी, सुरत.' },
        { heading: '[[5-shubh|शुभ स्थळ]]', body: 'श्री. विनुभाई प्रेमजीभाई धोलकिया\nबी-११७ आदर्शनगर सोसायटी वि-२,\nछापराभाठा रोड, अमरोली, सुरत.' },
      ],
    },
    {
      title: 'स्नेही स्वजन',
      sections: [
        { heading: '', body: '॥ शुभ ॥ <> ॥ लाभ ॥' },
        { heading: '', body: '**॥ स्नेही स्वजन ॥**\n[[6-flourish]]' },
        { heading: '', body: '[[6-divya|दिव्य आशीर्वाद]]' },
        { heading: '', body: 'स्व. मोंघीबेन धनजीभाई धोलकिया\nस्व. धनजीभाई शंभूभाई धोलकिया' },
        { heading: '', body: '[[6-sneh|स्नेहांकित]]' },
        {
          heading: '',
          body: 'स्व. प्रेमजीभाई धनजीभाई धोलकिया\nस्व. बाबूभाई धनजीभाई धोलकिया\nस्व. भूपतभाई धनजीभाई धोलकिया\nश्री. हिम्मतभाई धनजीभाई धोलकिया\nश्री. लालजीभाई लवजीभाई धोलकिया\nस्व. मीठाभाई शंभूभाई धोलकिया\nस्व. वशरामभाई शंभूभाई धोलकिया\nश्री. लवाभाई शंभूभाई धोलकिया\nश्री. उकाभाई मीठाभाई धोलकिया\nश्री. छगनभाई वशरामभाई धोलकिया',
        },
        { heading: '', body: 'आमच्या मातोश्री लीलाबा यांचा जय स्वामिनारायण' },
        { heading: '', body: '[[6-avsar|आपले नम्र]]' },
        {
          heading: '',
          body: 'श्री. संजयभाई प्रेमजीभाई धोलकिया\nश्री. रमेशभाई बाबूभाई धोलकिया\nश्री. नरेशभाई बाबूभाई धोलकिया\nश्री. राजेशभाई बाबूभाई धोलकिया\nश्री. निलेशभाई भूपतभाई धोलकिया\nश्री. जितेंद्रभाई हिम्मतभाई धोलकिया\nश्री. केनिल विनुभाई धोलकिया\nश्री. स्नेह संजयभाई धोलकिया\nश्री. कृषांत रमेशभाई धोलकिया\nश्री. विनीत रमेशभाई धोलकिया\nश्री. दिव्येश नरेशभाई धोलकिया\nश्री. प्रिन्स राजेशभाई धोलकिया\nश्री. नील नरेशभाई धोलकिया\nश्री. धर्म जितेंद्रभाई धोलकिया\nश्री. नैतिकभाई निलेशभाई धोलकिया',
        },
        { heading: '', body: '[[6-mosal|आजोळ पक्ष]]' },
        { heading: '', body: 'श्री. नरेशभाई भोलाभाई नाडोदा\n(चितल)' },
        { heading: '', body: '[[6-bhanej|भाचे पक्ष]]' },
        { heading: '', body: 'श्री. रोशन बिपिनभाई शंकर\n(लाठी)' },
      ],
    },
    { title: 'अविस्मरणीय क्षण', sections: [] },
    {
      title: 'निमंत्रण',
      sections: [
        { heading: '', body: '*धोलकिया*' },
        { heading: '', body: '>>*परिवार*' },
        {
          heading: '',
          body: '***स्नेही स्वजन श्री,***\nहे डिजिटल निमंत्रण प्रत्यक्ष भेटीसमान मानून\nआमच्या अंगणी आलेल्या शुभविवाह सोहळ्यास उपस्थित राहावे.\nस्नेही श्री, हे कार्ड वाचून ***OK*** असा उत्तर संदेश पाठवण्याची विनंती.',
        },
      ],
    },
  ],
  pa: [
    { title: 'ਧੋਲਕੀਆ ਪਰਿਵਾਰ', sections: [{ heading: '', body: '*ਧੋਲਕੀਆ*' }, { heading: '', body: '*ਪਰਿਵਾਰ*' }] },
    {
      title: 'ਸ਼ੁਭ ਵਿਆਹ ਉਤਸਵ',
      sections: [
        { heading: '', body: '|| ਸ਼੍ਰੀ ਗਣੇਸ਼ਾਯ ਨਮਃ ||' },
        { heading: '', body: '[[2-ganesh]]' },
        { heading: '', body: '[[2-title|**ਸ਼ੁਭ ਵਿਆਹ ਉਤਸਵ**]]' },
        { heading: '', body: '<<*ਚਿ. ਜੇਨਿਸ਼*' },
        { heading: '', body: '[[2-hands|ਦਾ ਸ਼ੁਭ ਵਿਆਹ]]' },
        { heading: '', body: '>>*ਚਿ. ਅੰਜਲੀ*' },
        { heading: '', body: '[[2-date|25/11/2022, ਸ਼ੁੱਕਰਵਾਰ]]' },
        { heading: '', body: '[[2-shriman|*ਸ਼੍ਰੀਮਾਨ* ____________________________]]' },
        { heading: '', body: '[[2-nimantrak||| ਸੱਦਾ ਦੇਣ ਵਾਲੇ ||]]' },
        {
          heading: '',
          body: '*ਸ਼੍ਰੀ ਵਿਨੂਭਾਈ ਪ੍ਰੇਮਜੀਭਾਈ ਧੋਲਕੀਆ*\n*ਸ਼੍ਰੀ ਸੰਜੇਭਾਈ ਪ੍ਰੇਮਜੀਭਾਈ ਧੋਲਕੀਆ*\n*ਬੀ-117 ਆਦਰਸ਼ਨਗਰ ਸੋਸਾਇਟੀ ਵਿ-2,*\n*ਛਾਪਰਾਭਾਠਾ ਰੋਡ, ਅਮਰੋਲੀ, ਸੂਰਤ.*\n*ਫ਼ੋਨ: 98765 43210 - 91234 56789*',
        },
      ],
    },
    { title: 'ਸਾਡੀ ਜੋੜੀ', sections: [] },
    {
      title: 'ਮੰਗਲ ਸਮਾਗਮ',
      sections: [
        { heading: '', body: '|| ਸ਼੍ਰੀ ਗਣੇਸ਼ਾਯ ਨਮਃ ||' },
        { heading: '', body: '[[4-ganesh]]' },
        { heading: '', body: '**|| ਮੰਗਲ ਸਮਾਗਮ ||**\n[[4-flourish]]' },
        { heading: '', body: '[[4-mandap|ਮੰਡਪ ਮਹੂਰਤ]]' },
        { heading: '', body: '24/11/2022, ਵੀਰਵਾਰ\nਦੁਪਹਿਰ 01:00 ਵਜੇ\nਸ਼੍ਰੀਮਤੀ ਸੋਨਲਬੇਨ ਸੰਜੇਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀਮਤੀ ਕਾਜਲਬੇਨ ਨਿਲੇਸ਼ਭਾਈ ਧੋਲਕੀਆ' },
        {
          heading: '[[4-swaruchi|ਪ੍ਰੀਤੀ ਭੋਜ]]',
          body: '24/11/2022, ਵੀਰਵਾਰ\nਸ਼ਾਮ 06:00 ਵਜੇ\nਆਪ *ਸਪਰਿਵਾਰ* ਪਧਾਰਨਾ ਜੀ।\nਸ਼੍ਰੀਮਤੀ ਨੀਤਾਬੇਨ ਨਰੇਸ਼ਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀਮਤੀ ਮੰਜੁਲਾਬੇਨ ਰਮੇਸ਼ਭਾਈ ਧੋਲਕੀਆ\nਸਥਾਨ: ਮਾਧਵਾਨੰਦ ਆਸ਼ਰਮ, ਰਾਮ ਕਥਾ ਰੋਡ,\nਅੰਬਾ ਤਲਾਵੜੀ, ਕਤਾਰਗਾਮ.',
        },
        {
          heading: '[[4-jaan|ਬਰਾਤ ਰਵਾਨਗੀ]]',
          body: '25/11/2022, ਸ਼ੁੱਕਰਵਾਰ\nਸ਼ਾਮ 04:00 ਵਜੇ\nਆਪ *ਸਪਰਿਵਾਰ* ਪਧਾਰਨਾ ਜੀ।\nਸ਼੍ਰੀਮਤੀ ਰੇਖਾਬੇਨ ਰਾਜੇਸ਼ਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀਮਤੀ ਕੋਮਲਬੇਨ ਜਿਤੇਂਦਰਭਾਈ ਧੋਲਕੀਆ\nਸਥਾਨ: 22, ਅਪਰਣਾ ਸੋਸਾਇਟੀ, ਰਾਮ ਕਥਾ ਰੋਡ,\nਅੰਬਾ ਤਲਾਵੜੀ, ਕਤਾਰਗਾਮ.',
        },
        { heading: '', body: '[[4-hast|ਸ਼ੁਭ ਹਸਤਮਿਲਾਪ]]' },
        { heading: '', body: '25/11/2022, ਸ਼ੁੱਕਰਵਾਰ\nਰਾਤ 9:00 ਵਜੇ।' },
        { heading: '', body: '[[4-mitho|ਮਿੱਠੀ ਪੁਕਾਰ]]' },
        {
          heading: '',
          body: 'ਤਾਂਘ ਹੈ ਤੁਹਾਡੇ ਨਿੱਘੇ ਆਸ਼ੀਰਵਾਦ ਦੀ, ਚਾਹ ਹੈ ਤੁਹਾਡੀਆਂ ਪਿਆਰ ਭਰੀਆਂ ਸ਼ੁਭਕਾਮਨਾਵਾਂ ਦੀ\nਉਡੀਕ ਹੈ ਤੁਹਾਡੀ ਦਿਲੋਂ ਹਾਜ਼ਰੀ ਦੀ...\n*- ਵਿਸ਼ਵਾ, ਸਨੇਹ, ਆਰਵ, ਕ੍ਰਿਸ਼ਨਾ, ਧਿਆਨੀ, ਆਧਿਆ.*',
        },
      ],
    },
    {
      title: 'ਵਿਆਹ ਮਹੋਤਸਵ',
      sections: [
        { heading: '', body: '|| ਸ਼ੁਭ || <> || ਸ਼੍ਰੀ ਰਾਜਰਾਜੇਸ਼ਵਰੀ ਬੁਟਭਵਾਨੀ ਮਾਤਾਜੀ || <> || ਲਾਭ ||' },
        { heading: '', body: '[[5-mataji]]' },
        { heading: '', body: '**|| ਵਿਆਹ ਮਹੋਤਸਵ ||**\n[[5-flourish]]' },
        {
          heading: '',
          body: 'ਸਤਿਕਾਰਯੋਗ ਸ਼੍ਰੀ,..............................................\nਬੜੀ ਖ਼ੁਸ਼ੀ ਨਾਲ ਦੱਸਦੇ ਹਾਂ ਕਿ ਸਾਡੀ ਕੁਲਦੇਵੀ ਸ਼੍ਰੀ ਰਾਜਰਾਜੇਸ਼ਵਰੀ ਬੁਟਭਵਾਨੀ ਮਾਤਾਜੀ ਦੀ ਅਪਾਰ ਕਿਰਪਾ ਨਾਲ\nਘੁਘਰਾਲਾ ਨਿਵਾਸੀ (ਹੁਣ ਸੂਰਤ)\nਸ਼੍ਰੀਮਤੀ ਭਾਵਨਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਵਿਨੂਭਾਈ ਪ੍ਰੇਮਜੀਭਾਈ ਧੋਲਕੀਆ ਦੇ ਸਪੁੱਤਰ',
        },
        { heading: '', body: '<<*ਚਿ. ਜੇਨਿਸ਼*' },
        { heading: '', body: '[[5-hands|ਦਾ ਸ਼ੁਭ ਵਿਆਹ]]' },
        { heading: '', body: '>>*ਚਿ. ਅੰਜਲੀ*' },
        {
          heading: '',
          body: 'ਦਾਮਨਗਰ ਨਿਵਾਸੀ (ਹੁਣ ਸੂਰਤ)\nਸ਼੍ਰੀਮਤੀ ਰੇਖਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਜੈਸੁਖਭਾਈ ਵੱਲਭਭਾਈ ਨਾਰੋਲਾ ਦੀ ਸਪੁੱਤਰੀ\nਨਾਲ ਸੰਮਤ 2079 ਮੱਘਰ ਸੁਦੀ 2, ਸ਼ੁੱਕਰਵਾਰ 25-11-2022 ਦੇ ਸ਼ੁਭ ਦਿਨ ਤੈਅ ਹੋਇਆ\nਹੈ। ਇਸ ਸ਼ੁਭ ਮੌਕੇ ਗ੍ਰਹਿਸਥ ਜੀਵਨ ਵਿੱਚ ਕਦਮ ਰੱਖਦੀ ਨਵੀਂ ਜੋੜੀ ਨੂੰ ਆਸ਼ੀਰਵਾਦ ਦੇਣ\nਅਤੇ ਸਾਡੀ ਖ਼ੁਸ਼ੀ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਲਈ ਆਪ ਜੀ ਨੂੰ ਨਿੱਘਾ ਸੱਦਾ ਹੈ। ਇਸ ਸ਼ੁਭ ਮੌਕੇ\nਪਧਾਰ ਕੇ ਸਾਡੇ ਸਮਾਗਮ ਦੀ ਸ਼ੋਭਾ ਵਧਾਓ ਜੀ...',
        },
        { heading: '[[5-lagna|ਵਿਆਹ ਸਥਾਨ]]', body: 'ਸ਼੍ਰੀ ਜੈਸੁਖਭਾਈ ਵੱਲਭਭਾਈ ਨਾਰੋਲਾ\nਮਾਧਵਾਨੰਦ ਆਸ਼ਰਮ, ਰਾਮ ਕਥਾ ਰੋਡ,\nਅੰਬਾ ਤਲਾਵੜੀ, ਸੂਰਤ.' },
        { heading: '[[5-shubh|ਸ਼ੁਭ ਸਥਾਨ]]', body: 'ਸ਼੍ਰੀ ਵਿਨੂਭਾਈ ਪ੍ਰੇਮਜੀਭਾਈ ਧੋਲਕੀਆ\nਬੀ-117 ਆਦਰਸ਼ਨਗਰ ਸੋਸਾਇਟੀ ਵਿ-2,\nਛਾਪਰਾਭਾਠਾ ਰੋਡ, ਅਮਰੋਲੀ, ਸੂਰਤ.' },
      ],
    },
    {
      title: 'ਪਿਆਰੇ ਸੱਜਣ',
      sections: [
        { heading: '', body: '|| ਸ਼ੁਭ || <> || ਲਾਭ ||' },
        { heading: '', body: '**|| ਪਿਆਰੇ ਸੱਜਣ ||**\n[[6-flourish]]' },
        { heading: '', body: '[[6-divya|ਦਿਵਯ ਆਸ਼ੀਰਵਾਦ]]' },
        { heading: '', body: 'ਸਵ. ਮੋਂਘੀਬੇਨ ਧਨਜੀਭਾਈ ਧੋਲਕੀਆ\nਸਵ. ਧਨਜੀਭਾਈ ਸ਼ੰਭੂਭਾਈ ਧੋਲਕੀਆ' },
        { heading: '', body: '[[6-sneh|ਸਨੇਹ ਸਹਿਤ]]' },
        {
          heading: '',
          body: 'ਸਵ. ਪ੍ਰੇਮਜੀਭਾਈ ਧਨਜੀਭਾਈ ਧੋਲਕੀਆ\nਸਵ. ਬਾਬੂਭਾਈ ਧਨਜੀਭਾਈ ਧੋਲਕੀਆ\nਸਵ. ਭੂਪਤਭਾਈ ਧਨਜੀਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਹਿੰਮਤਭਾਈ ਧਨਜੀਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਲਾਲਜੀਭਾਈ ਲਵਜੀਭਾਈ ਧੋਲਕੀਆ\nਸਵ. ਮੀਠਾਭਾਈ ਸ਼ੰਭੂਭਾਈ ਧੋਲਕੀਆ\nਸਵ. ਵਸ਼ਰਾਮਭਾਈ ਸ਼ੰਭੂਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਲਵਾਭਾਈ ਸ਼ੰਭੂਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਉਕਾਭਾਈ ਮੀਠਾਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਛਗਨਭਾਈ ਵਸ਼ਰਾਮਭਾਈ ਧੋਲਕੀਆ',
        },
        { heading: '', body: 'ਸਾਡੇ ਮਾਤਾ ਜੀ ਲੀਲਾਬਾ ਵੱਲੋਂ ਜੈ ਸਵਾਮੀਨਾਰਾਇਣ' },
        { heading: '', body: '[[6-avsar|ਦਰਸ਼ਨ ਅਭਿਲਾਖੀ]]' },
        {
          heading: '',
          body: 'ਸ਼੍ਰੀ ਸੰਜੇਭਾਈ ਪ੍ਰੇਮਜੀਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਰਮੇਸ਼ਭਾਈ ਬਾਬੂਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਨਰੇਸ਼ਭਾਈ ਬਾਬੂਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਰਾਜੇਸ਼ਭਾਈ ਬਾਬੂਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਨਿਲੇਸ਼ਭਾਈ ਭੂਪਤਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਜਿਤੇਂਦਰਭਾਈ ਹਿੰਮਤਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਕੇਨਿਲ ਵਿਨੂਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਸਨੇਹ ਸੰਜੇਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਕ੍ਰਿਸ਼ਾਂਤ ਰਮੇਸ਼ਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਵਿਨੀਤ ਰਮੇਸ਼ਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਦਿਵਯੇਸ਼ ਨਰੇਸ਼ਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਪ੍ਰਿੰਸ ਰਾਜੇਸ਼ਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਨੀਲ ਨਰੇਸ਼ਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਧਰਮ ਜਿਤੇਂਦਰਭਾਈ ਧੋਲਕੀਆ\nਸ਼੍ਰੀ ਨੈਤਿਕਭਾਈ ਨਿਲੇਸ਼ਭਾਈ ਧੋਲਕੀਆ',
        },
        { heading: '', body: '[[6-mosal|ਨਾਨਕਾ ਪਰਿਵਾਰ]]' },
        { heading: '', body: 'ਸ਼੍ਰੀ ਨਰੇਸ਼ਭਾਈ ਭੋਲਾਭਾਈ ਨਾਡੋਦਾ\n(ਚਿਤਲ)' },
        { heading: '', body: '[[6-bhanej|ਭਾਣਜਾ ਪੱਖ]]' },
        { heading: '', body: 'ਸ਼੍ਰੀ ਰੋਸ਼ਨ ਬਿਪਿਨਭਾਈ ਸ਼ੰਕਰ\n(ਲਾਠੀ)' },
      ],
    },
    { title: 'ਯਾਦਗਾਰ ਪਲ', sections: [] },
    {
      title: 'ਸੱਦਾ',
      sections: [
        { heading: '', body: '*ਧੋਲਕੀਆ*' },
        { heading: '', body: '>>*ਪਰਿਵਾਰ*' },
        {
          heading: '',
          body: '***ਸਤਿਕਾਰਯੋਗ ਸ਼੍ਰੀ,***\nਇਸ ਡਿਜੀਟਲ ਕਾਰਡ ਨੂੰ ਨਿੱਜੀ ਮੁਲਾਕਾਤ ਸਮਾਨ ਸਮਝ ਕੇ\nਸਾਡੇ ਵਿਹੜੇ ਆਏ ਸ਼ੁਭ ਵਿਆਹ ਸਮਾਗਮ ਵਿੱਚ ਪਧਾਰਨਾ ਜੀ।\nਕਿਰਪਾ ਕਰਕੇ ਇਹ ਕਾਰਡ ਪੜ੍ਹ ਕੇ ***OK*** ਦਾ ਜਵਾਬੀ ਸੁਨੇਹਾ ਭੇਜੋ ਜੀ।',
        },
      ],
    },
  ],
  ta: [
    { title: 'தோலகியா குடும்பம்', sections: [{ heading: '', body: '*தோலகியா*' }, { heading: '', body: '*குடும்பம்*' }] },
    {
      title: 'சுப திருமண விழா',
      sections: [
        { heading: '', body: '|| ஸ்ரீ கணேசாய நமஃ ||' },
        { heading: '', body: '[[2-ganesh]]' },
        { heading: '', body: '[[2-title|**சுப திருமண விழா**]]' },
        { heading: '', body: '<<*செல்வன் ஜெனிஷ்*' },
        { heading: '', body: '[[2-hands|சுப திருமணம்]]' },
        { heading: '', body: '>>*செல்வி அஞ்சலி*' },
        { heading: '', body: '[[2-date|25/11/2022, வெள்ளிக்கிழமை]]' },
        { heading: '', body: '[[2-shriman|*திரு* ____________________________]]' },
        { heading: '', body: '[[2-nimantrak||| அழைப்போர் ||]]' },
        {
          heading: '',
          body: '*திரு வினுபாய் பிரேம்ஜிபாய் தோலகியா*\n*திரு சஞ்சய்பாய் பிரேம்ஜிபாய் தோலகியா*\n*பி-117 ஆதர்ஷ்நகர் சொசைட்டி வி-2,*\n*சாப்ராபாதா சாலை, அம்ரோலி, சூரத்.*\n*தொலைபேசி: 98765 43210 - 91234 56789*',
        },
      ],
    },
    { title: 'எங்கள் ஜோடி', sections: [] },
    {
      title: 'மங்கல நிகழ்வுகள்',
      sections: [
        { heading: '', body: '|| ஸ்ரீ கணேசாய நமஃ ||' },
        { heading: '', body: '[[4-ganesh]]' },
        { heading: '', body: '**|| மங்கல நிகழ்வுகள் ||**\n[[4-flourish]]' },
        { heading: '', body: '[[4-mandap|பந்தக்கால் முகூர்த்தம்]]' },
        { heading: '', body: '24/11/2022, வியாழக்கிழமை\nபிற்பகல் 01:00 மணிக்கு\nதிருமதி சோனல்பென் சஞ்சய்பாய் தோலகியா\nதிருமதி காஜல்பென் நிலேஷ்பாய் தோலகியா' },
        {
          heading: '[[4-swaruchi|விருந்து]]',
          body: '24/11/2022, வியாழக்கிழமை\nமாலை 06:00 மணிக்கு\nதாங்கள் *குடும்பத்துடன்* வருகை தரவும்.\nதிருமதி நீதாபென் நரேஷ்பாய் தோலகியா\nதிருமதி மஞ்சுளாபென் ரமேஷ்பாய் தோலகியா\nஇடம்: மாதவானந்த் ஆசிரமம், ராம் கதா சாலை,\nஅம்பா தலாவ்டி, கதார்காம்.',
        },
        {
          heading: '[[4-jaan|மாப்பிள்ளை அழைப்பு]]',
          body: '25/11/2022, வெள்ளிக்கிழமை\nமாலை 04:00 மணிக்கு\nதாங்கள் *குடும்பத்துடன்* வருகை தரவும்.\nதிருமதி ரேகாபென் ராஜேஷ்பாய் தோலகியா\nதிருமதி கோமல்பென் ஜிதேந்திரபாய் தோலகியா\nஇடம்: 22, அபர்ணா சொசைட்டி, ராம் கதா சாலை,\nஅம்பா தலாவ்டி, கதார்காம்.',
        },
        { heading: '', body: '[[4-hast|பாணிக்கிரகணம்]]' },
        { heading: '', body: '25/11/2022, வெள்ளிக்கிழமை\nஇரவு 9:00 மணிக்கு.' },
        { heading: '', body: '[[4-mitho|இனிய அழைப்பு]]' },
        {
          heading: '',
          body: 'உங்கள் அன்பான ஆசீர்வாதத்தை நாடுகிறோம், உங்கள் நேசமிகு வாழ்த்துகளை விழைகிறோம்\nஉங்கள் மனமார்ந்த வருகையை எதிர்பார்க்கிறோம்...\n*- விஷ்வா, ஸ்நேஹ், ஆரவ், கிருஷ்ணா, த்யானி, ஆத்யா.*',
        },
      ],
    },
    {
      title: 'திருமண மகோத்சவம்',
      sections: [
        { heading: '', body: '|| சுபம் || <> || ஸ்ரீ ராஜராஜேஸ்வரி புட்பவானி மாதாஜி || <> || லாபம் ||' },
        { heading: '', body: '[[5-mataji]]' },
        { heading: '', body: '**|| திருமண மகோத்சவம் ||**\n[[5-flourish]]' },
        {
          heading: '',
          body: 'அன்புடையீர்,..............................................\nஎங்கள் குலதெய்வம் ஸ்ரீ ராஜராஜேஸ்வரி புட்பவானி மாதாஜியின் பேரருளால் மகிழ்ச்சியுடன் தெரிவிப்பது\nகுக்ராலாவைச் சேர்ந்த (தற்போது சூரத்)\nதிருமதி பாவனாபென் - திரு வினுபாய் பிரேம்ஜிபாய் தோலகியா அவர்களின் மகன்',
        },
        { heading: '', body: '<<*செல்வன் ஜெனிஷ்*' },
        { heading: '', body: '[[5-hands|சுப திருமணம்]]' },
        { heading: '', body: '>>*செல்வி அஞ்சலி*' },
        {
          heading: '',
          body: 'தாம்நகரைச் சேர்ந்த (தற்போது சூரத்)\nதிருமதி ரேகாபென் - திரு ஜெய்சுக்பாய் வல்லபபாய் நரோலா அவர்களின் மகள்\nஉடன் சம்வத் 2079 மார்கசீர்ஷ சுக்ல துவிதியை, வெள்ளிக்கிழமை 25-11-2022 அன்று திருமணம்\nநிச்சயிக்கப்பட்டுள்ளது. இல்லற வாழ்வில் அடியெடுத்து வைக்கும் மணமக்களை ஆசீர்வதிக்கவும்\nஎங்கள் மகிழ்ச்சியில் பங்கேற்கவும் தங்களை அன்புடன் அழைக்கிறோம். இந்த சுப நாளில்\nதாங்கள் வருகை தந்து விழாவைச் சிறப்பிக்க வேண்டுகிறோம்...',
        },
        { heading: '[[5-lagna|திருமண இடம்]]', body: 'திரு ஜெய்சுக்பாய் வல்லபபாய் நரோலா\nமாதவானந்த் ஆசிரமம், ராம் கதா சாலை,\nஅம்பா தலாவ்டி, சூரத்.' },
        { heading: '[[5-shubh|இல்ல முகவரி]]', body: 'திரு வினுபாய் பிரேம்ஜிபாய் தோலகியா\nபி-117 ஆதர்ஷ்நகர் சொசைட்டி வி-2,\nசாப்ராபாதா சாலை, அம்ரோலி, சூரத்.' },
      ],
    },
    {
      title: 'அன்பு உறவுகள்',
      sections: [
        { heading: '', body: '|| சுபம் || <> || லாபம் ||' },
        { heading: '', body: '**|| அன்பு உறவுகள் ||**\n[[6-flourish]]' },
        { heading: '', body: '[[6-divya|தெய்வீக ஆசீர்வாதம்]]' },
        { heading: '', body: 'அமரர் மோங்கிபென் தன்ஜிபாய் தோலகியா\nஅமரர் தன்ஜிபாய் சம்புபாய் தோலகியா' },
        { heading: '', body: '[[6-sneh|அன்புடன்]]' },
        {
          heading: '',
          body: 'அமரர் பிரேம்ஜிபாய் தன்ஜிபாய் தோலகியா\nஅமரர் பாபுபாய் தன்ஜிபாய் தோலகியா\nஅமரர் பூபத்பாய் தன்ஜிபாய் தோலகியா\nதிரு ஹிம்மத்பாய் தன்ஜிபாய் தோலகியா\nதிரு லால்ஜிபாய் லவ்ஜிபாய் தோலகியா\nஅமரர் மீதாபாய் சம்புபாய் தோலகியா\nஅமரர் வஷ்ராம்பாய் சம்புபாய் தோலகியா\nதிரு லவாபாய் சம்புபாய் தோலகியா\nதிரு உகாபாய் மீதாபாய் தோலகியா\nதிரு சகன்பாய் வஷ்ராம்பாய் தோலகியா',
        },
        { heading: '', body: 'எங்கள் அன்னை லீலாபாவின் ஜெய் சுவாமிநாராயண்' },
        { heading: '', body: '[[6-avsar|அன்புடன் அழைப்போர்]]' },
        {
          heading: '',
          body: 'திரு சஞ்சய்பாய் பிரேம்ஜிபாய் தோலகியா\nதிரு ரமேஷ்பாய் பாபுபாய் தோலகியா\nதிரு நரேஷ்பாய் பாபுபாய் தோலகியா\nதிரு ராஜேஷ்பாய் பாபுபாய் தோலகியா\nதிரு நிலேஷ்பாய் பூபத்பாய் தோலகியா\nதிரு ஜிதேந்திரபாய் ஹிம்மத்பாய் தோலகியா\nதிரு கெனில் வினுபாய் தோலகியா\nதிரு ஸ்நேஹ் சஞ்சய்பாய் தோலகியா\nதிரு க்ருஷாந்த் ரமேஷ்பாய் தோலகியா\nதிரு வினித் ரமேஷ்பாய் தோலகியா\nதிரு திவ்யேஷ் நரேஷ்பாய் தோலகியா\nதிரு பிரின்ஸ் ராஜேஷ்பாய் தோலகியா\nதிரு நீல் நரேஷ்பாய் தோலகியா\nதிரு தர்ம் ஜிதேந்திரபாய் தோலகியா\nதிரு நைதிக்பாய் நிலேஷ்பாய் தோலகியா',
        },
        { heading: '', body: '[[6-mosal|தாய்மாமன் வீடு]]' },
        { heading: '', body: 'திரு நரேஷ்பாய் போலாபாய் நாடோதா\n(சித்தல்)' },
        { heading: '', body: '[[6-bhanej|மருமகன் தரப்பு]]' },
        { heading: '', body: 'திரு ரோஷன் பிபின்பாய் சங்கர்\n(லாத்தி)' },
      ],
    },
    { title: 'நினைவுத் தருணங்கள்', sections: [] },
    {
      title: 'அழைப்பு',
      sections: [
        { heading: '', body: '*தோலகியா*' },
        { heading: '', body: '>>*குடும்பம்*' },
        {
          heading: '',
          body: '***அன்புடையீர்,***\nஇந்த டிஜிட்டல் அழைப்பை நேரில் அழைத்ததாகக் கருதி\nஎங்கள் இல்லத் திருமண விழாவிற்கு வருகை தரவும்.\nஇந்த அட்டையைப் படித்தபின் ***OK*** என பதில் அனுப்ப வேண்டுகிறோம்.',
        },
      ],
    },
  ],
}
export default tr
