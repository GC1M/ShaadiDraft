import type { Template } from '../../templates'

// The printed card's pages in every language but Gujarati: same pages, same sections, same marks; only the words change.
const DOTS = '..............................................'

const tr: NonNullable<Template['tr']> = {
  en: [
    {
      title: 'Vora Family',
      sections: [
        { heading: '', body: '**Vora Family**' },
        { heading: '', body: '[[1-gap]]' },
        { heading: '', body: '<<~Akash~\n~&~\n>>~Hiral~' },
        { heading: '', body: '***21*** January, Tuesday ***2025***' },
      ],
    },
    {
      title: 'Shubh Vivah',
      sections: [
        { heading: '', body: '[[2-title|**Shubh Vivah**]]' },
        { heading: '', body: '*Chi. Akash* *weds* *Chi. Hiral*' },
        { heading: '', body: '[[2-divider]]\n***21/01/2025, Tuesday***' },
        { heading: '', body: `*Dear Shri,*${DOTS}` },
        {
          heading: '',
          body: '[[3-swirl-l]] *|| Invited By ||* [[3-swirl-r]]\nShri Rasikbhai Gangdasbhai Vora\nShri Yogeshbhai Gangdasbhai Vora\nB-903, Park Avenue,\nOpp. Silver Palace, Utran, Surat.\nMob.: 98765 43210, 91234 56789',
        },
      ],
    },
    {
      title: 'Auspicious Occasions',
      sections: [
        { heading: '', body: '[[3-title|**Auspicious Occasions**]]' },
        { heading: '', body: '*...|| Mandap Muhurat ||...*\n[[3-rule]]\nMonday, 20/01/2025\nat 1:30 in the afternoon\nSmt. Vijyaben Rasikbhai Vora' },
        { heading: '...|| Geet Gunjan / Raas Garba ||...', body: '[[3-rule]]\nMonday, 20/01/2025\nat 7:00 in the evening\nSmt. Sonalben Yogeshbhai Vora' },
        { heading: '...|| Dinner ||...', body: '[[3-rule]]\nMonday, 20/01/2025\nat 6:30 in the evening\nKindly join us *with your spouse*.\nSmt. Shitalben Dhavalbhai Vora' },
        { heading: '', body: '*All functions are at Shri Hari Farm.*' },
        {
          heading: '',
          body: '[[3-swirl-l]] *|| Family Residence ||* [[3-swirl-r]]\nShri Rasikbhai Gangdasbhai Vora\nShri Yogeshbhai Gangdasbhai Vora\nB-903, Park Avenue,\nOpp. Silver Palace, Utran, Surat.',
        },
      ],
    },
    {
      title: 'Golden Occasions',
      sections: [
        { heading: '', body: '[[4-title|**Golden Occasions**]]' },
        {
          heading: '',
          body: '*...|| Baraat Departure ||...*\n[[3-rule]]\nTuesday, 21/01/2025\nat 4:30 in the afternoon\nKindly join us *with your spouse*.\nFrom: Fire Station,\nMota Varachha.',
        },
        { heading: '', body: '*...|| Hast Melap ||...*\n[[3-rule]]\nTuesday, 21/01/2025\nat 8:00 in the evening' },
        {
          heading: '',
          body: '[[3-swirl-l]] *|| Wedding Venue ||* [[3-swirl-r]]\n‘‘Shri Hari Farm’’,\nNext to the Government School,\nFire Station,\nnear Mota Varachha, Surat.',
        },
      ],
    },
    {
      title: 'Wedding Celebration',
      sections: [
        { heading: '', body: '[[5-title|**Wedding Celebration**]]' },
        { heading: '', body: '***Dear Shri,*** ________________________' },
        {
          heading: '',
          body: 'With great joy we share that\nby the boundless grace of our family goddess Aai Shri Khodiyar Mataji\nour son, of Shivrajgadh (now Surat),\nson of Smt. Vijyaben and Shri Rasikbhai Gangdasbhai Vora',
        },
        { heading: '', body: '*Chi. Akash* [[5-hands|weds]] *Chi. Hiral*' },
        {
          heading: '',
          body: 'of Daliya (now Surat),\ndaughter of Smt. Harshaben and Shri Maheshbhai Jivrajbhai Dhanva,\non Tuesday, Posh Vad 7, Samvat 2081, 21/01/2025.\nAt this meeting of two hearts and two families, we warmly invite you\nto bless the newly wed couple.',
        },
      ],
    },
    {
      title: 'Bonds of Love',
      sections: [
        { heading: '', body: '[[6-title|**Bonds of Love**]]' },
        {
          heading: '',
          body: "[[3-swirl-l]] *|| Maternal Family ||* [[3-swirl-r]]\nLate Gandubhai Rajabhai Dudhatra  Shri Rasikbhai Gandubhai Dudhatra\nShri Sureshbhai Gandubhai Dudhatra  Shri Bhaveshbhai Gandubhai Dudhatra\n(Devchadi)",
        },
        { heading: '', body: "[[3-swirl-l]] *|| Sister's Family ||* [[3-swirl-r]]\nShri Bhautik Raghavbhai Sankhwala\nKu. Hasti Raghavbhai Sankhwala\n(Ramod)" },
        {
          heading: '',
          body: "[[3-swirl-l]] *|| Sweet Chirping ||* [[3-swirl-r]]\nWith Shriji Maharaj by our side, in Gopinathji's lap, in Harikrishna Maharaj's love,\nin Radharaman's reign, bowing to Narayan Dev, pleasing Ganeshji,\nby Kashtbhanjan's grace, we welcome you to our brother's wedding...\n*– Riddhi, Mantra, Hetvi, Bhautik, Hasti, Jash...*",
        },
      ],
    },
    {
      title: 'Eager to Welcome',
      sections: [
        { heading: '', body: '[[7-title|**Eager to Welcome**]]' },
        { heading: '', body: '[[3-swirl-l]] *|| Blossoms of the Family ||* [[3-swirl-r]]\nShri Mantra Yogeshbhai Vora\nShri Jash Dhavalbhai Vora' },
        { heading: '', body: '[[3-swirl-l]] *|| With Affection ||* [[3-swirl-r]]' },
        {
          heading: '',
          body: 'Late Ambabhai Manjibhai Vora\nLate Gangdasbhai Ambabhai Vora\nLate Jasmatbhai Ambabhai Vora\nShri Rasikbhai Gangdasbhai Vora\nShri Yogeshbhai Gangdasbhai Vora\nShri Dhavalbhai Jasmatbhai Vora\nLate Paniben Ambabhai Vora\nSmt. Prabhaben Gangdasbhai Vora\nSmt. Jayaben Jasmatbhai Vora\nSmt. Vijyaben Rasikbhai Vora\nSmt. Sonalben Yogeshbhai Vora\nSmt. Shitalben Dhavalbhai Vora',
        },
      ],
    },
    {
      title: 'E-Invitation',
      sections: [
        { heading: '', body: '*:: E-Invitation ::*' },
        { heading: '', body: 'Dear family and friends,\nfor the wedding of our beloved son' },
        { heading: '', body: '*Digital Invitation Card*' },
        {
          heading: '',
          body: 'has been sent to you.\nPlease treat it as a personal visit and do come.\nOnce you receive this invitation,\nkindly reply with *OK*.',
        },
        { heading: '', body: '*Awaiting your presence*' },
        { heading: '', body: '*Vora Family*' },
      ],
    },
  ],
  hi: [
    {
      title: 'वोरा परिवार',
      sections: [
        { heading: '', body: '**वोरा परिवार**' },
        { heading: '', body: '[[1-gap]]' },
        { heading: '', body: '<<~Akash~\n~&~\n>>~Hiral~' },
        { heading: '', body: '***21*** January, Tuesday ***2025***' },
      ],
    },
    {
      title: 'शुभ विवाह',
      sections: [
        { heading: '', body: '[[2-title|**शुभ विवाह**]]' },
        { heading: '', body: '*चि. आकाश* *संग* *चि. हिरल*' },
        { heading: '', body: '[[2-divider]]\n***21/01/2025, मंगलवार***' },
        { heading: '', body: `*स्नेही श्री,*${DOTS}` },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ निमंत्रक ॥* [[3-swirl-r]]\nश्री रसिकभाई गंगदासभाई वोरा\nश्री योगेशभाई गंगदासभाई वोरा\nबी-903, पार्क एवेन्यू,\nसिल्वर पैलेस के सामने, उत्राण, सूरत।\nमो.: 98765 43210, 91234 56789',
        },
      ],
    },
    {
      title: 'मांगलिक अवसर',
      sections: [
        { heading: '', body: '[[3-title|**मांगलिक अवसर**]]' },
        { heading: '', body: '*...॥ मंडप मुहूर्त ॥...*\n[[3-rule]]\nदि. 20/01/2025, सोमवार\nको दोपहर 1:30 बजे\nअ.सौ. विज्याबेन रसिकभाई वोरा' },
        { heading: '...॥ गीत गुंजन/रास गरबा ॥...', body: '[[3-rule]]\nदि. 20/01/2025, सोमवार\nको शाम 7:00 बजे\nअ.सौ. सोनलबेन योगेशभाई वोरा' },
        { heading: '...॥ स्वरुचि भोज ॥...', body: '[[3-rule]]\nदि. 20/01/2025, सोमवार\nको शाम 6:30 बजे\nआप *सपत्नीक* पधारें।\nअ.सौ. शीतलबेन धवलभाई वोरा' },
        { heading: '', body: '*सभी कार्यक्रम श्री हरि फार्म में रखे गए हैं।*' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ शुभ स्थान ॥* [[3-swirl-r]]\nश्री रसिकभाई गंगदासभाई वोरा\nश्री योगेशभाई गंगदासभाई वोरा\nबी-903, पार्क एवेन्यू,\nसिल्वर पैलेस के सामने, उत्राण, सूरत।',
        },
      ],
    },
    {
      title: 'सुनहरे अवसर',
      sections: [
        { heading: '', body: '[[4-title|**सुनहरे अवसर**]]' },
        {
          heading: '',
          body: '*...॥ बारात प्रस्थान ॥...*\n[[3-rule]]\nदि. 21/01/2025, मंगलवार\nको दोपहर 4:30 बजे\nआप *सपत्नीक* पधारें।\nस्थान : फायर स्टेशन,\nमोटा वराछा से निकलेगी।',
        },
        { heading: '', body: '*...॥ हस्त मिलाप ॥...*\n[[3-rule]]\nदि. 21/01/2025, मंगलवार\nको रात 8:00 बजे' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ विवाह स्थल ॥* [[3-swirl-r]]\n‘‘श्री हरि फार्म’’,\nसरकारी स्कूल के बगल में,\nफायर स्टेशन,\nमोटा वराछा के पास, सूरत।',
        },
      ],
    },
    {
      title: 'परिणय उत्सव',
      sections: [
        { heading: '', body: '[[5-title|**परिणय उत्सव**]]' },
        { heading: '', body: '***स्नेही स्वजन श्री,*** ________________________' },
        {
          heading: '',
          body: 'सहर्ष सूचित करते हैं कि\nहमारी कुलदेवी आई श्री खोडियार माताजी की असीम कृपा से\nशिवराजगढ़ निवासी (हाल सूरत)\nअ.सौ. विज्याबेन एवं श्री रसिकभाई गंगदासभाई वोरा के सुपुत्र',
        },
        { heading: '', body: '*चि. आकाश* [[5-hands|का शुभ विवाह]] *चि. हिरल*' },
        {
          heading: '',
          body: 'दालिया निवासी (हाल सूरत)\nअ.सौ. हर्षाबेन एवं श्री महेशभाई जीवराजभाई धंवा की सुपुत्री के साथ\nसंवत 2081 पौष कृष्ण 7, मंगलवार, दि. 21/01/2025 को निश्चित हुआ है।\nइस शुभ अवसर पर दो हृदयों और परिवारों के मिलन की बेला में नवदंपति को\nशुभाशीष देने हेतु हमारा भावभरा आमंत्रण है।',
        },
      ],
    },
    {
      title: 'स्नेह बंधन',
      sections: [
        { heading: '', body: '[[6-title|**स्नेह बंधन**]]' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ ननिहाल पक्ष ॥* [[3-swirl-r]]\nस्व. गांडुभाई राजाभाई दुधात्रा  श्री रसिकभाई गांडुभाई दुधात्रा\nश्री सुरेशभाई गांडुभाई दुधात्रा  श्री भावेशभाई गांडुभाई दुधात्रा\n(देवचडी)',
        },
        { heading: '', body: '[[3-swirl-l]] *॥ भांजा पक्ष ॥* [[3-swirl-r]]\nश्री भौतिक राघवभाई संखवाला\nकु. हस्ती राघवभाई संखवाला\n(रामोद)' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ मधुर कलरव ॥* [[3-swirl-r]]\nश्रीजी महाराज के साथ में, गोपीनाथजी की गोद में, हरिकृष्ण महाराज के स्नेह में,\nराधारमण के राज में, नारायण देव को नमन कर, गणेशजी को भाकर,\nकष्टभंजन की कृपा में, हम आपको आमंत्रित करते हैं भाई के विवाह में...\n*– रिद्धि, मंत्र, हेत्वी, भौतिक, हस्ती, जश...*',
        },
      ],
    },
    {
      title: 'स्वागत को आतुर',
      sections: [
        { heading: '', body: '[[7-title|**स्वागत को आतुर**]]' },
        { heading: '', body: '[[3-swirl-l]] *॥ परिवार के पुष्प ॥* [[3-swirl-r]]\nश्री मंत्र योगेशभाई वोरा\nश्री जश धवलभाई वोरा' },
        { heading: '', body: '[[3-swirl-l]] *॥ स्नेहाधीन ॥* [[3-swirl-r]]' },
        {
          heading: '',
          body: 'स्व. आंबाभाई मनजीभाई वोरा\nस्व. गंगदासभाई आंबाभाई वोरा\nस्व. जसमतभाई आंबाभाई वोरा\nश्री रसिकभाई गंगदासभाई वोरा\nश्री योगेशभाई गंगदासभाई वोरा\nश्री धवलभाई जसमतभाई वोरा\nस्व. पानीबेन आंबाभाई वोरा\nगं.स्व. प्रभाबेन गंगदासभाई वोरा\nगं.स्व. जयाबेन जसमतभाई वोरा\nअ.सौ. विज्याबेन रसिकभाई वोरा\nअ.सौ. सोनलबेन योगेशभाई वोरा\nअ.सौ. शीतलबेन धवलभाई वोरा',
        },
      ],
    },
    {
      title: 'ई-आमंत्रण',
      sections: [
        { heading: '', body: '*:: ई-आमंत्रण ::*' },
        { heading: '', body: 'स्नेही स्वजन श्री,\nहमारे लाडले सुपुत्र के विवाह का' },
        { heading: '', body: '*डिजिटल आमंत्रण कार्ड*' },
        {
          heading: '',
          body: 'आपको भेजा गया है।\nइसे व्यक्तिगत भेंट समझकर अवश्य पधारें।\nआपको आमंत्रण मिल गया है,\nइसका उत्तर *OK* लिखकर दें।',
        },
        { heading: '', body: '*आप स्नेहीजनों की प्रतीक्षा में*' },
        { heading: '', body: '*वोरा परिवार*' },
      ],
    },
  ],
  mr: [
    {
      title: 'वोरा परिवार',
      sections: [
        { heading: '', body: '**वोरा परिवार**' },
        { heading: '', body: '[[1-gap]]' },
        { heading: '', body: '<<~Akash~\n~&~\n>>~Hiral~' },
        { heading: '', body: '***21*** January, Tuesday ***2025***' },
      ],
    },
    {
      title: 'शुभविवाह',
      sections: [
        { heading: '', body: '[[2-title|**शुभविवाह**]]' },
        { heading: '', body: '*चि. आकाश* *सोबत* *चि. हिरल*' },
        { heading: '', body: '[[2-divider]]\n***२१/०१/२०२५, मंगळवार***' },
        { heading: '', body: `*स्नेही श्री,*${DOTS}` },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ निमंत्रक ॥* [[3-swirl-r]]\nश्री. रसिकभाई गंगदासभाई वोरा\nश्री. योगेशभाई गंगदासभाई वोरा\nबी-९०३, पार्क एव्हेन्यू,\nसिल्व्हर पॅलेससमोर, उत्राण, सुरत.\nमो.: ९८७६५ ४३२१०, ९१२३४ ५६७८९',
        },
      ],
    },
    {
      title: 'मंगल प्रसंग',
      sections: [
        { heading: '', body: '[[3-title|**मंगल प्रसंग**]]' },
        { heading: '', body: '*...॥ मंडप मुहूर्त ॥...*\n[[3-rule]]\nदि. २०/०१/२०२५, सोमवार\nरोजी दुपारी १:३० वाजता\nअ.सौ. विज्याबेन रसिकभाई वोरा' },
        { heading: '...॥ गीत गुंजन/रास गरबा ॥...', body: '[[3-rule]]\nदि. २०/०१/२०२५, सोमवार\nरोजी सायंकाळी ७:०० वाजता\nअ.सौ. सोनलबेन योगेशभाई वोरा' },
        { heading: '...॥ स्नेहभोजन ॥...', body: '[[3-rule]]\nदि. २०/०१/२०२५, सोमवार\nरोजी सायंकाळी ६:३० वाजता\nआपण *सपत्नीक* यावे.\nअ.सौ. शीतलबेन धवलभाई वोरा' },
        { heading: '', body: '*सर्व कार्यक्रम श्री हरी फार्म येथे आहेत.*' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ शुभ स्थळ ॥* [[3-swirl-r]]\nश्री. रसिकभाई गंगदासभाई वोरा\nश्री. योगेशभाई गंगदासभाई वोरा\nबी-९०३, पार्क एव्हेन्यू,\nसिल्व्हर पॅलेससमोर, उत्राण, सुरत.',
        },
      ],
    },
    {
      title: 'सोनेरी प्रसंग',
      sections: [
        { heading: '', body: '[[4-title|**सोनेरी प्रसंग**]]' },
        {
          heading: '',
          body: '*...॥ वरात प्रस्थान ॥...*\n[[3-rule]]\nदि. २१/०१/२०२५, मंगळवार\nरोजी दुपारी ४:३० वाजता\nआपण *सपत्नीक* यावे.\nस्थळ : फायर स्टेशन,\nमोटा वराछा येथून निघेल.',
        },
        { heading: '', body: '*...॥ हस्तमिलाप ॥...*\n[[3-rule]]\nदि. २१/०१/२०२५, मंगळवार\nरोजी रात्री ८:०० वाजता' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ विवाह स्थळ ॥* [[3-swirl-r]]\n‘‘श्री हरी फार्म’’,\nसरकारी शाळेच्या शेजारी,\nफायर स्टेशन,\nमोटा वराछाजवळ, सुरत.',
        },
      ],
    },
    {
      title: 'परिणय उत्सव',
      sections: [
        { heading: '', body: '[[5-title|**परिणय उत्सव**]]' },
        { heading: '', body: '***स्नेही स्वजन श्री,*** ________________________' },
        {
          heading: '',
          body: 'कळविण्यास अत्यंत आनंद होतो की\nआमची कुलदेवता आई श्री खोडियार माताजी यांच्या असीम कृपेने\nशिवराजगड निवासी (सध्या सुरत)\nअ.सौ. विज्याबेन व श्री. रसिकभाई गंगदासभाई वोरा यांचे सुपुत्र',
        },
        { heading: '', body: '*चि. आकाश* [[5-hands|यांचा शुभविवाह]] *चि. हिरल*' },
        {
          heading: '',
          body: 'दाळिया निवासी (सध्या सुरत)\nअ.सौ. हर्षाबेन व श्री. महेशभाई जीवराजभाई धंवा यांच्या सुकन्येसोबत\nसंवत २०८१ पौष वद ७, मंगळवार, दि. २१/०१/२०२५ रोजी निश्चित झाला आहे.\nया शुभप्रसंगी दोन हृदये आणि दोन परिवारांच्या मिलनाच्या वेळी नवदांपत्याला\nशुभाशीर्वाद देण्यासाठी आमचे सस्नेह निमंत्रण आहे.',
        },
      ],
    },
    {
      title: 'स्नेहबंधन',
      sections: [
        { heading: '', body: '[[6-title|**स्नेहबंधन**]]' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ मामा पक्ष ॥* [[3-swirl-r]]\nस्व. गांडुभाई राजाभाई दुधात्रा  श्री. रसिकभाई गांडुभाई दुधात्रा\nश्री. सुरेशभाई गांडुभाई दुधात्रा  श्री. भावेशभाई गांडुभाई दुधात्रा\n(देवचडी)',
        },
        { heading: '', body: '[[3-swirl-l]] *॥ भाचे पक्ष ॥* [[3-swirl-r]]\nश्री. भौतिक राघवभाई संखवाला\nकु. हस्ती राघवभाई संखवाला\n(रामोद)' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ मधुर किलबिल ॥* [[3-swirl-r]]\nश्रीजी महाराजांच्या साथीने, गोपीनाथजींच्या कुशीत, हरिकृष्ण महाराजांच्या प्रेमात,\nराधारमणाच्या राज्यात, नारायण देवाला नमन करून, गणेशजींना आवडेल असे,\nकष्टभंजनाच्या कृपेने, आम्ही आपले स्वागत करतो भाईच्या लग्नात...\n*– रिद्धी, मंत्र, हेत्वी, भौतिक, हस्ती, जश...*',
        },
      ],
    },
    {
      title: 'स्वागतास उत्सुक',
      sections: [
        { heading: '', body: '[[7-title|**स्वागतास उत्सुक**]]' },
        { heading: '', body: '[[3-swirl-l]] *॥ परिवाराची फुले ॥* [[3-swirl-r]]\nश्री. मंत्र योगेशभाई वोरा\nश्री. जश धवलभाई वोरा' },
        { heading: '', body: '[[3-swirl-l]] *॥ स्नेहाधीन ॥* [[3-swirl-r]]' },
        {
          heading: '',
          body: 'स्व. आंबाभाई मनजीभाई वोरा\nस्व. गंगदासभाई आंबाभाई वोरा\nस्व. जसमतभाई आंबाभाई वोरा\nश्री. रसिकभाई गंगदासभाई वोरा\nश्री. योगेशभाई गंगदासभाई वोरा\nश्री. धवलभाई जसमतभाई वोरा\nस्व. पानीबेन आंबाभाई वोरा\nगं.भा. प्रभाबेन गंगदासभाई वोरा\nगं.भा. जयाबेन जसमतभाई वोरा\nअ.सौ. विज्याबेन रसिकभाई वोरा\nअ.सौ. सोनलबेन योगेशभाई वोरा\nअ.सौ. शीतलबेन धवलभाई वोरा',
        },
      ],
    },
    {
      title: 'ई-निमंत्रण',
      sections: [
        { heading: '', body: '*:: ई-निमंत्रण ::*' },
        { heading: '', body: 'स्नेही स्वजन श्री,\nआमच्या लाडक्या सुपुत्राच्या लग्नाचे' },
        { heading: '', body: '*डिजिटल निमंत्रण पत्रिका*' },
        {
          heading: '',
          body: 'आपणास पाठवली आहे.\nप्रत्यक्ष भेट समजून अवश्य यावे.\nआपणास निमंत्रण मिळाले असल्यास\n*OK* असे उत्तर पाठवावे.',
        },
        { heading: '', body: '*आपल्या आगमनाच्या प्रतीक्षेत*' },
        { heading: '', body: '*वोरा परिवार*' },
      ],
    },
  ],
  pa: [
    {
      title: 'ਵੋਰਾ ਪਰਿਵਾਰ',
      sections: [
        { heading: '', body: '**ਵੋਰਾ ਪਰਿਵਾਰ**' },
        { heading: '', body: '[[1-gap]]' },
        { heading: '', body: '<<~Akash~\n~&~\n>>~Hiral~' },
        { heading: '', body: '***21*** January, Tuesday ***2025***' },
      ],
    },
    {
      title: 'ਸ਼ੁਭ ਵਿਆਹ',
      sections: [
        { heading: '', body: '[[2-title|**ਸ਼ੁਭ ਵਿਆਹ**]]' },
        { heading: '', body: '*ਚਿ. ਆਕਾਸ਼* *ਸੰਗ* *ਚਿ. ਹਿਰਲ*' },
        { heading: '', body: '[[2-divider]]\n***21/01/2025, ਮੰਗਲਵਾਰ***' },
        { heading: '', body: `*ਸਨੇਹੀ ਸ਼੍ਰੀ,*${DOTS}` },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ ਸੱਦਾ ਦੇਣ ਵਾਲੇ ॥* [[3-swirl-r]]\nਸ਼੍ਰੀ ਰਸਿਕਭਾਈ ਗੰਗਦਾਸਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀ ਯੋਗੇਸ਼ਭਾਈ ਗੰਗਦਾਸਭਾਈ ਵੋਰਾ\nਬੀ-903, ਪਾਰਕ ਐਵੇਨਿਊ,\nਸਿਲਵਰ ਪੈਲੇਸ ਦੇ ਸਾਹਮਣੇ, ਉਤਰਾਣ, ਸੂਰਤ।\nਮੋ.: 98765 43210, 91234 56789',
        },
      ],
    },
    {
      title: 'ਮੰਗਲ ਮੌਕੇ',
      sections: [
        { heading: '', body: '[[3-title|**ਮੰਗਲ ਮੌਕੇ**]]' },
        { heading: '', body: '*...॥ ਮੰਡਪ ਮਹੂਰਤ ॥...*\n[[3-rule]]\nਮਿਤੀ 20/01/2025, ਸੋਮਵਾਰ\nਨੂੰ ਦੁਪਹਿਰ 1:30 ਵਜੇ\nਸ਼੍ਰੀਮਤੀ ਵਿਜਯਾਬੇਨ ਰਸਿਕਭਾਈ ਵੋਰਾ' },
        { heading: '...॥ ਗੀਤ ਗੂੰਜਨ/ਰਾਸ ਗਰਬਾ ॥...', body: '[[3-rule]]\nਮਿਤੀ 20/01/2025, ਸੋਮਵਾਰ\nਨੂੰ ਸ਼ਾਮ 7:00 ਵਜੇ\nਸ਼੍ਰੀਮਤੀ ਸੋਨਲਬੇਨ ਯੋਗੇਸ਼ਭਾਈ ਵੋਰਾ' },
        { heading: '...॥ ਪ੍ਰੀਤੀ ਭੋਜ ॥...', body: '[[3-rule]]\nਮਿਤੀ 20/01/2025, ਸੋਮਵਾਰ\nਨੂੰ ਸ਼ਾਮ 6:30 ਵਜੇ\nਆਪ *ਜੋੜੇ ਸਮੇਤ* ਪਧਾਰੋ ਜੀ।\nਸ਼੍ਰੀਮਤੀ ਸ਼ੀਤਲਬੇਨ ਧਵਲਭਾਈ ਵੋਰਾ' },
        { heading: '', body: '*ਸਾਰੇ ਸਮਾਗਮ ਸ਼੍ਰੀ ਹਰੀ ਫਾਰਮ ਵਿਖੇ ਹਨ।*' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ ਸ਼ੁਭ ਸਥਾਨ ॥* [[3-swirl-r]]\nਸ਼੍ਰੀ ਰਸਿਕਭਾਈ ਗੰਗਦਾਸਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀ ਯੋਗੇਸ਼ਭਾਈ ਗੰਗਦਾਸਭਾਈ ਵੋਰਾ\nਬੀ-903, ਪਾਰਕ ਐਵੇਨਿਊ,\nਸਿਲਵਰ ਪੈਲੇਸ ਦੇ ਸਾਹਮਣੇ, ਉਤਰਾਣ, ਸੂਰਤ।',
        },
      ],
    },
    {
      title: 'ਸੁਨਹਿਰੇ ਮੌਕੇ',
      sections: [
        { heading: '', body: '[[4-title|**ਸੁਨਹਿਰੇ ਮੌਕੇ**]]' },
        {
          heading: '',
          body: '*...॥ ਬਰਾਤ ਰਵਾਨਗੀ ॥...*\n[[3-rule]]\nਮਿਤੀ 21/01/2025, ਮੰਗਲਵਾਰ\nਨੂੰ ਦੁਪਹਿਰ 4:30 ਵਜੇ\nਆਪ *ਜੋੜੇ ਸਮੇਤ* ਪਧਾਰੋ ਜੀ।\nਸਥਾਨ : ਫਾਇਰ ਸਟੇਸ਼ਨ,\nਮੋਟਾ ਵਰਾਛਾ ਤੋਂ ਚੱਲੇਗੀ।',
        },
        { heading: '', body: '*...॥ ਹਸਤ ਮਿਲਾਪ ॥...*\n[[3-rule]]\nਮਿਤੀ 21/01/2025, ਮੰਗਲਵਾਰ\nਨੂੰ ਰਾਤ 8:00 ਵਜੇ' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ ਵਿਆਹ ਸਥਾਨ ॥* [[3-swirl-r]]\n‘‘ਸ਼੍ਰੀ ਹਰੀ ਫਾਰਮ’’,\nਸਰਕਾਰੀ ਸਕੂਲ ਦੇ ਨਾਲ,\nਫਾਇਰ ਸਟੇਸ਼ਨ,\nਮੋਟਾ ਵਰਾਛਾ ਦੇ ਨੇੜੇ, ਸੂਰਤ।',
        },
      ],
    },
    {
      title: 'ਪਰਿਣਯ ਉਤਸਵ',
      sections: [
        { heading: '', body: '[[5-title|**ਪਰਿਣਯ ਉਤਸਵ**]]' },
        { heading: '', body: '***ਸਨੇਹੀ ਸੱਜਣ ਸ਼੍ਰੀ,*** ________________________' },
        {
          heading: '',
          body: 'ਬੜੀ ਖ਼ੁਸ਼ੀ ਨਾਲ ਦੱਸਦੇ ਹਾਂ ਕਿ\nਸਾਡੀ ਕੁਲਦੇਵੀ ਆਈ ਸ਼੍ਰੀ ਖੋਡਿਯਾਰ ਮਾਤਾਜੀ ਦੀ ਅਪਾਰ ਕਿਰਪਾ ਨਾਲ\nਸ਼ਿਵਰਾਜਗੜ੍ਹ ਨਿਵਾਸੀ (ਹੁਣ ਸੂਰਤ)\nਸ਼੍ਰੀਮਤੀ ਵਿਜਯਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਰਸਿਕਭਾਈ ਗੰਗਦਾਸਭਾਈ ਵੋਰਾ ਦੇ ਸਪੁੱਤਰ',
        },
        { heading: '', body: '*ਚਿ. ਆਕਾਸ਼* [[5-hands|ਦਾ ਸ਼ੁਭ ਵਿਆਹ]] *ਚਿ. ਹਿਰਲ*' },
        {
          heading: '',
          body: 'ਦਾਲੀਆ ਨਿਵਾਸੀ (ਹੁਣ ਸੂਰਤ)\nਸ਼੍ਰੀਮਤੀ ਹਰਸ਼ਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਮਹੇਸ਼ਭਾਈ ਜੀਵਰਾਜਭਾਈ ਧੰਵਾ ਦੀ ਸਪੁੱਤਰੀ ਨਾਲ\nਸੰਵਤ 2081 ਪੋਹ ਵਦੀ 7, ਮੰਗਲਵਾਰ, ਮਿਤੀ 21/01/2025 ਨੂੰ ਤੈਅ ਹੋਇਆ ਹੈ।\nਇਸ ਸ਼ੁਭ ਮੌਕੇ ਦੋ ਦਿਲਾਂ ਅਤੇ ਦੋ ਪਰਿਵਾਰਾਂ ਦੇ ਮਿਲਾਪ ਦੀ ਘੜੀ ਨਵ-ਵਿਆਹੀ ਜੋੜੀ ਨੂੰ\nਅਸ਼ੀਰਵਾਦ ਦੇਣ ਲਈ ਸਾਡਾ ਨਿੱਘਾ ਸੱਦਾ ਹੈ।',
        },
      ],
    },
    {
      title: 'ਸਨੇਹ ਬੰਧਨ',
      sections: [
        { heading: '', body: '[[6-title|**ਸਨੇਹ ਬੰਧਨ**]]' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ ਨਾਨਕਾ ਪੱਖ ॥* [[3-swirl-r]]\nਸਵ. ਗਾਂਡੂਭਾਈ ਰਾਜਾਭਾਈ ਦੁਧਾਤਰਾ  ਸ਼੍ਰੀ ਰਸਿਕਭਾਈ ਗਾਂਡੂਭਾਈ ਦੁਧਾਤਰਾ\nਸ਼੍ਰੀ ਸੁਰੇਸ਼ਭਾਈ ਗਾਂਡੂਭਾਈ ਦੁਧਾਤਰਾ  ਸ਼੍ਰੀ ਭਾਵੇਸ਼ਭਾਈ ਗਾਂਡੂਭਾਈ ਦੁਧਾਤਰਾ\n(ਦੇਵਚੜੀ)',
        },
        { heading: '', body: '[[3-swirl-l]] *॥ ਭਾਣਜਾ ਪੱਖ ॥* [[3-swirl-r]]\nਸ਼੍ਰੀ ਭੌਤਿਕ ਰਾਘਵਭਾਈ ਸੰਖਵਾਲਾ\nਕੁ. ਹਸਤੀ ਰਾਘਵਭਾਈ ਸੰਖਵਾਲਾ\n(ਰਾਮੋਦ)' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ ਮਿੱਠੀ ਚਹਿਕ ॥* [[3-swirl-r]]\nਸ਼੍ਰੀਜੀ ਮਹਾਰਾਜ ਦੇ ਸਾਥ ਵਿੱਚ, ਗੋਪੀਨਾਥਜੀ ਦੀ ਗੋਦ ਵਿੱਚ, ਹਰਿਕ੍ਰਿਸ਼ਨ ਮਹਾਰਾਜ ਦੇ ਪਿਆਰ ਵਿੱਚ,\nਰਾਧਾਰਮਣ ਦੇ ਰਾਜ ਵਿੱਚ, ਨਾਰਾਇਣ ਦੇਵ ਨੂੰ ਨਮਨ ਕਰਕੇ, ਗਣੇਸ਼ਜੀ ਨੂੰ ਭਾਉਂਦੇ,\nਕਸ਼ਟਭੰਜਨ ਦੀ ਕਿਰਪਾ ਨਾਲ, ਅਸੀਂ ਤੁਹਾਨੂੰ ਸੱਦਾ ਦਿੰਦੇ ਹਾਂ ਭਾਈ ਦੇ ਵਿਆਹ ਵਿੱਚ...\n*– ਰਿੱਧੀ, ਮੰਤਰ, ਹੇਤਵੀ, ਭੌਤਿਕ, ਹਸਤੀ, ਜਸ਼...*',
        },
      ],
    },
    {
      title: 'ਸਵਾਗਤ ਲਈ ਉਤਸੁਕ',
      sections: [
        { heading: '', body: '[[7-title|**ਸਵਾਗਤ ਲਈ ਉਤਸੁਕ**]]' },
        { heading: '', body: '[[3-swirl-l]] *॥ ਪਰਿਵਾਰ ਦੇ ਫੁੱਲ ॥* [[3-swirl-r]]\nਸ਼੍ਰੀ ਮੰਤਰ ਯੋਗੇਸ਼ਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀ ਜਸ਼ ਧਵਲਭਾਈ ਵੋਰਾ' },
        { heading: '', body: '[[3-swirl-l]] *॥ ਸਨੇਹਾਧੀਨ ॥* [[3-swirl-r]]' },
        {
          heading: '',
          body: 'ਸਵ. ਅੰਬਾਭਾਈ ਮਨਜੀਭਾਈ ਵੋਰਾ\nਸਵ. ਗੰਗਦਾਸਭਾਈ ਅੰਬਾਭਾਈ ਵੋਰਾ\nਸਵ. ਜਸਮਤਭਾਈ ਅੰਬਾਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀ ਰਸਿਕਭਾਈ ਗੰਗਦਾਸਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀ ਯੋਗੇਸ਼ਭਾਈ ਗੰਗਦਾਸਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀ ਧਵਲਭਾਈ ਜਸਮਤਭਾਈ ਵੋਰਾ\nਸਵ. ਪਾਣੀਬੇਨ ਅੰਬਾਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀਮਤੀ ਪ੍ਰਭਾਬੇਨ ਗੰਗਦਾਸਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀਮਤੀ ਜਯਾਬੇਨ ਜਸਮਤਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀਮਤੀ ਵਿਜਯਾਬੇਨ ਰਸਿਕਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀਮਤੀ ਸੋਨਲਬੇਨ ਯੋਗੇਸ਼ਭਾਈ ਵੋਰਾ\nਸ਼੍ਰੀਮਤੀ ਸ਼ੀਤਲਬੇਨ ਧਵਲਭਾਈ ਵੋਰਾ',
        },
      ],
    },
    {
      title: 'ਈ-ਸੱਦਾ',
      sections: [
        { heading: '', body: '*:: ਈ-ਸੱਦਾ ::*' },
        { heading: '', body: 'ਸਨੇਹੀ ਸੱਜਣ ਜੀ,\nਸਾਡੇ ਲਾਡਲੇ ਸਪੁੱਤਰ ਦੇ ਵਿਆਹ ਦਾ' },
        { heading: '', body: '*ਡਿਜੀਟਲ ਸੱਦਾ ਪੱਤਰ*' },
        {
          heading: '',
          body: 'ਆਪ ਜੀ ਨੂੰ ਭੇਜਿਆ ਗਿਆ ਹੈ।\nਇਸ ਨੂੰ ਨਿੱਜੀ ਮੁਲਾਕਾਤ ਸਮਝ ਕੇ ਜ਼ਰੂਰ ਪਧਾਰੋ।\nਆਪ ਜੀ ਨੂੰ ਸੱਦਾ ਮਿਲ ਗਿਆ ਹੈ,\nਇਸ ਦਾ ਜਵਾਬ *OK* ਲਿਖ ਕੇ ਦਿਓ ਜੀ।',
        },
        { heading: '', body: '*ਆਪ ਜੀ ਦੀ ਉਡੀਕ ਵਿੱਚ*' },
        { heading: '', body: '*ਵੋਰਾ ਪਰਿਵਾਰ*' },
      ],
    },
  ],
  ta: [
    {
      title: 'வோரா குடும்பம்',
      sections: [
        { heading: '', body: '**வோரா குடும்பம்**' },
        { heading: '', body: '[[1-gap]]' },
        { heading: '', body: '<<~Akash~\n~&~\n>>~Hiral~' },
        { heading: '', body: '***21*** January, Tuesday ***2025***' },
      ],
    },
    {
      title: 'சுப விவாகம்',
      sections: [
        { heading: '', body: '[[2-title|**சுப விவாகம்**]]' },
        { heading: '', body: '*செல்வன் ஆகாஷ்* *உடன்* *செல்வி ஹிரல்*' },
        { heading: '', body: '[[2-divider]]\n***21/01/2025, செவ்வாய்க்கிழமை***' },
        { heading: '', body: `*அன்புடையீர்,*${DOTS}` },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ அழைப்பவர்கள் ॥* [[3-swirl-r]]\nதிரு ரசிக்பாய் கங்க்தாஸ்பாய் வோரா\nதிரு யோகேஷ்பாய் கங்க்தாஸ்பாய் வோரா\nபி-903, பார்க் அவென்யூ,\nசில்வர் பேலஸ் எதிரில், உத்ரான், சூரத்.\nகைபேசி: 98765 43210, 91234 56789',
        },
      ],
    },
    {
      title: 'மங்கல நிகழ்வுகள்',
      sections: [
        { heading: '', body: '[[3-title|**மங்கல நிகழ்வுகள்**]]' },
        { heading: '', body: '*...॥ மண்டப முகூர்த்தம் ॥...*\n[[3-rule]]\n20/01/2025, திங்கட்கிழமை\nமதியம் 1:30 மணிக்கு\nதிருமதி விஜ்யாபென் ரசிக்பாய் வோரா' },
        { heading: '...॥ கீத குஞ்சன்/ராஸ் கர்பா ॥...', body: '[[3-rule]]\n20/01/2025, திங்கட்கிழமை\nமாலை 7:00 மணிக்கு\nதிருமதி சோனல்பென் யோகேஷ்பாய் வோரா' },
        { heading: '...॥ விருந்து ॥...', body: '[[3-rule]]\n20/01/2025, திங்கட்கிழமை\nமாலை 6:30 மணிக்கு\n*தம்பதி சமேதராக* வருகை தருக.\nதிருமதி ஷீதல்பென் தவல்பாய் வோரா' },
        { heading: '', body: '*அனைத்து நிகழ்வுகளும் ஸ்ரீ ஹரி பண்ணையில்.*' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ இல்ல முகவரி ॥* [[3-swirl-r]]\nதிரு ரசிக்பாய் கங்க்தாஸ்பாய் வோரா\nதிரு யோகேஷ்பாய் கங்க்தாஸ்பாய் வோரா\nபி-903, பார்க் அவென்யூ,\nசில்வர் பேலஸ் எதிரில், உத்ரான், சூரத்.',
        },
      ],
    },
    {
      title: 'பொன்னான நிகழ்வுகள்',
      sections: [
        { heading: '', body: '[[4-title|**பொன்னான நிகழ்வுகள்**]]' },
        {
          heading: '',
          body: '*...॥ மாப்பிள்ளை அழைப்பு ॥...*\n[[3-rule]]\n21/01/2025, செவ்வாய்க்கிழமை\nமதியம் 4:30 மணிக்கு\n*தம்பதி சமேதராக* வருகை தருக.\nஇடம் : தீயணைப்பு நிலையம்,\nமோட்டா வராச்சாவிலிருந்து புறப்படும்.',
        },
        { heading: '', body: '*...॥ பாணிக்கிரகணம் ॥...*\n[[3-rule]]\n21/01/2025, செவ்வாய்க்கிழமை\nஇரவு 8:00 மணிக்கு' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ திருமண இடம் ॥* [[3-swirl-r]]\n‘‘ஸ்ரீ ஹரி பண்ணை’’,\nஅரசுப் பள்ளி அருகில்,\nதீயணைப்பு நிலையம்,\nமோட்டா வராச்சா அருகில், சூரத்.',
        },
      ],
    },
    {
      title: 'திருமண விழா',
      sections: [
        { heading: '', body: '[[5-title|**திருமண விழா**]]' },
        { heading: '', body: '***அன்புடையீர்,*** ________________________' },
        {
          heading: '',
          body: 'மிக்க மகிழ்ச்சியுடன் தெரிவிக்கிறோம்,\nஎங்கள் குலதெய்வம் ஆயி ஸ்ரீ கோடியார் மாதாஜியின் அளவற்ற அருளால்\nசிவராஜ்கட் (தற்போது சூரத்)\nதிருமதி விஜ்யாபென் & திரு ரசிக்பாய் கங்க்தாஸ்பாய் வோரா அவர்களின் புதல்வன்',
        },
        { heading: '', body: '*சி. ஆகாஷ்* [[5-hands|சுப திருமணம்]] *சௌ. ஹிரல்*' },
        {
          heading: '',
          body: 'தாளியா (தற்போது சூரத்)\nதிருமதி ஹர்ஷாபென் & திரு மகேஷ்பாய் ஜீவராஜ்பாய் தன்வா அவர்களின் புதல்வியுடன்\nசம்வத் 2081 பௌஷ கிருஷ்ண சப்தமி, செவ்வாய், 21/01/2025 அன்று நிச்சயிக்கப்பட்டுள்ளது.\nஇரு இதயங்களும் இரு குடும்பங்களும் இணையும் இந்நன்னாளில் மணமக்களை\nவாழ்த்த அன்புடன் அழைக்கிறோம்.',
        },
      ],
    },
    {
      title: 'அன்பின் பந்தம்',
      sections: [
        { heading: '', body: '[[6-title|**அன்பின் பந்தம்**]]' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ தாய்மாமன் குடும்பம் ॥* [[3-swirl-r]]\nஅமரர் காண்டுபாய் ராஜாபாய் துதாத்ரா  திரு ரசிக்பாய் காண்டுபாய் துதாத்ரா\nதிரு சுரேஷ்பாய் காண்டுபாய் துதாத்ரா  திரு பாவேஷ்பாய் காண்டுபாய் துதாத்ரா\n(தேவ்சடி)',
        },
        { heading: '', body: '[[3-swirl-l]] *॥ சகோதரி குடும்பம் ॥* [[3-swirl-r]]\nதிரு பௌதிக் ராகவ்பாய் சங்க்வாலா\nசெல்வி ஹஸ்தி ராகவ்பாய் சங்க்வாலா\n(ராமோத்)' },
        {
          heading: '',
          body: '[[3-swirl-l]] *॥ இனிய கீதம் ॥* [[3-swirl-r]]\nஸ்ரீஜி மகாராஜ் துணையுடன், கோபிநாத்ஜியின் மடியில், ஹரிகிருஷ்ண மகாராஜின் அன்பில்,\nராதாரமணின் ஆட்சியில், நாராயண தேவை வணங்கி, கணேஷ்ஜி மகிழ,\nகஷ்டபஞ்சனின் அருளில், அண்ணனின் திருமணத்திற்கு உங்களை வரவேற்கிறோம்...\n*– ரித்தி, மந்த்ரா, ஹேத்வி, பௌதிக், ஹஸ்தி, ஜஷ்...*',
        },
      ],
    },
    {
      title: 'வரவேற்கக் காத்திருக்கிறோம்',
      sections: [
        { heading: '', body: '[[7-title|**வரவேற்கக் காத்திருக்கிறோம்**]]' },
        { heading: '', body: '[[3-swirl-l]] *॥ குடும்ப மலர்கள் ॥* [[3-swirl-r]]\nதிரு மந்த்ரா யோகேஷ்பாய் வோரா\nதிரு ஜஷ் தவல்பாய் வோரா' },
        { heading: '', body: '[[3-swirl-l]] *॥ அன்புடன் ॥* [[3-swirl-r]]' },
        {
          heading: '',
          body: 'அமரர் அம்பாபாய் மன்ஜிபாய் வோரா\nஅமரர் கங்க்தாஸ்பாய் அம்பாபாய் வோரா\nஅமரர் ஜஸ்மத்பாய் அம்பாபாய் வோரா\nதிரு ரசிக்பாய் கங்க்தாஸ்பாய் வோரா\nதிரு யோகேஷ்பாய் கங்க்தாஸ்பாய் வோரா\nதிரு தவல்பாய் ஜஸ்மத்பாய் வோரா\nஅமரர் பானிபென் அம்பாபாய் வோரா\nதிருமதி பிரபாபென் கங்க்தாஸ்பாய் வோரா\nதிருமதி ஜயாபென் ஜஸ்மத்பாய் வோரா\nதிருமதி விஜ்யாபென் ரசிக்பாய் வோரா\nதிருமதி சோனல்பென் யோகேஷ்பாய் வோரா\nதிருமதி ஷீதல்பென் தவல்பாய் வோரா',
        },
      ],
    },
    {
      title: 'மின் அழைப்பிதழ்',
      sections: [
        { heading: '', body: '*:: மின் அழைப்பிதழ் ::*' },
        { heading: '', body: 'அன்புடையீர்,\nஎங்கள் அன்பு மகனின் திருமண' },
        { heading: '', body: '*டிஜிட்டல் அழைப்பிதழ்*' },
        {
          heading: '',
          body: 'உங்களுக்கு அனுப்பப்பட்டுள்ளது.\nநேரில் அழைத்ததாகக் கருதி அவசியம் வருக.\nஅழைப்பிதழ் கிடைத்ததும்\n*OK* என பதில் அனுப்பவும்.',
        },
        { heading: '', body: '*உங்கள் வருகையை எதிர்நோக்கி*' },
        { heading: '', body: '*வோரா குடும்பம்*' },
      ],
    },
  ],
}
export default tr
