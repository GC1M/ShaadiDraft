import type { Template } from '../../templates'

// The printed card's pages in every language but Gujarati: same pages, same sections, same marks; only the words change.
const tr: NonNullable<Template['tr']> = {
  en: [
    {
      title: 'Simant Sanskar',
      sections: [{ heading: '', body: '[[1-title|**Simant Sanskar**]]' }, { heading: '', body: '[[1-rule]]\n***A.Sau. Hasti***\n[[1-rule]]' }],
    },
    {
      title: 'Simant Ceremony',
      sections: [
        { heading: '', body: '|| Shri Ganeshaya Namah ||\n|| Shri Khodiyar Maa || <> || Shri Mahakali Maa ||' },
        { heading: '', body: '[[2-title|**Simant Sanskar**]]' },
        { heading: '', body: 'With great joy we share that by the boundless grace of our Kuldevi Shri Khodiyar Mataji\nand Shri Mahakali Mataji, the son of\nA.Sau. Muktaben and Shri Dineshbhai Ganeshbhai Mavani,' },
        { heading: '', body: '*wife of Chi. Harshil*' },
        { heading: '', body: '***A.Sau. Hasti***' },
        { heading: '', body: 'will have her Simant ceremony on Maha Vad 7, Samvat 2080,\nSunday, 03-03-2024, an auspicious day.\nWe warmly invite you to come and bless her on this happy occasion.' },
      ],
    },
    {
      title: 'Invited by',
      sections: [
        { heading: '', body: '*Dinner*\nOn Sunday, 03-03-2024, at 6:00 PM,\nplease grace the occasion with your presence.' },
        { heading: '', body: '*Venue*\nMadhav Farm, opp. Anand Dhara V-3,\nbehind Ratna Deep Farm, Mota Varachha, Surat.' },
        { heading: '', body: '*Invited by*\nLate Ganeshbhai Karshanbhai Mavani (Mo. 98765 43210)\nShri Dineshbhai Ganeshbhai Mavani (Mo. 91234 56789)' },
        { heading: '', body: '17, Saurashtra Bungalows, near Maharaj Farm, Mota Varachha, Surat.\n[[3-rule]]' },
      ],
    },
    {
      title: 'Jai Shri Krishna',
      sections: [{ heading: '', body: '**From the Mavani Family**\n**Jai Shri Krishna**' }],
    },
  ],
  hi: [
    {
      title: 'सीमंत संस्कार',
      sections: [{ heading: '', body: '[[1-title|**सीमंत संस्कार**]]' }, { heading: '', body: '[[1-rule]]\n***अ.सौ. हस्ती***\n[[1-rule]]' }],
    },
    {
      title: 'सीमंत विधि',
      sections: [
        { heading: '', body: '॥ श्री गणेशाय नमः ॥\n॥ श्री खोडियार माँ ॥ <> ॥ श्री महाकाली माँ ॥' },
        { heading: '', body: '[[2-title|**सीमंत संस्कार**]]' },
        { heading: '', body: 'सहर्ष सूचित करते हैं कि हमारी कुलदेवी श्री खोडियार माताजी\nतथा श्री महाकाली माताजी की असीम कृपा से\nअ.सौ. मुक्ताबेन तथा श्री दिनेशभाई गणेशभाई मावाणी के सुपुत्र' },
        { heading: '', body: '*चि. हर्षिल की धर्मपत्नी*' },
        { heading: '', body: '***अ.सौ. हस्ती***' },
        { heading: '', body: 'के सीमंत संस्कार का शुभ मुहूर्त संवत 2080, माघ कृष्ण 7,\nरविवार, दिनांक 03-03-2024 के शुभ दिन निश्चित किया है।\nअतः इस शुभ अवसर पर आशीर्वाद देने अवश्य पधारें।' },
      ],
    },
    {
      title: 'निमंत्रक',
      sections: [
        { heading: '', body: '*प्रीतिभोज*\nदिनांक 03-03-2024, रविवार को सायं 6:00 बजे\nपधारकर शोभा बढ़ाएँ।' },
        { heading: '', body: '*स्थल*\nमाधव फार्म, आनंद धारा वी-3 के सामने,\nरत्न दीप फार्म के पीछे, मोटा वराछा, सूरत.' },
        { heading: '', body: '*निमंत्रक*\nस्व. गणेशभाई करशनभाई मावाणी (मो. 98765 43210)\nश्री दिनेशभाई गणेशभाई मावाणी (मो. 91234 56789)' },
        { heading: '', body: '17, सौराष्ट्र बंगलोज़, महाराज फार्म के पास, मोटा वराछा, सूरत.\n[[3-rule]]' },
      ],
    },
    {
      title: 'जय श्री कृष्ण',
      sections: [{ heading: '', body: '**मावाणी परिवार का**\n**जय श्री कृष्ण**' }],
    },
  ],
  mr: [
    {
      title: 'सीमंत संस्कार',
      sections: [{ heading: '', body: '[[1-title|**सीमंत संस्कार**]]' }, { heading: '', body: '[[1-rule]]\n***अ.सौ. हस्ती***\n[[1-rule]]' }],
    },
    {
      title: 'डोहाळे जेवण',
      sections: [
        { heading: '', body: '॥ श्री गणेशाय नमः ॥\n॥ श्री खोडियार माता ॥ <> ॥ श्री महाकाली माता ॥' },
        { heading: '', body: '[[2-title|**सीमंत संस्कार**]]' },
        { heading: '', body: 'कळविण्यास अत्यंत आनंद होतो की आमची कुलदेवी श्री खोडियार माताजी\nव श्री महाकाली माताजी यांच्या असीम कृपेने\nअ.सौ. मुक्ताबेन व श्री. दिनेशभाई गणेशभाई मावाणी यांचे सुपुत्र' },
        { heading: '', body: '*चि. हर्षिल यांच्या धर्मपत्नी*' },
        { heading: '', body: '***अ.सौ. हस्ती***' },
        { heading: '', body: 'यांच्या सीमंत संस्काराचा शुभ मुहूर्त संवत 2080 माघ वद्य 7,\nरविवार, दि. 03-03-2024 रोजी निश्चित केला आहे.\nतरी या शुभ प्रसंगी आपण आशीर्वाद देण्यास अवश्य यावे.' },
      ],
    },
    {
      title: 'निमंत्रक',
      sections: [
        { heading: '', body: '*स्नेहभोजन*\nदि. 03-03-2024, रविवार रोजी सायं. 6:00 वाजता\nआपण उपस्थित राहून शोभा वाढवावी.' },
        { heading: '', body: '*स्थळ*\nमाधव फार्म, आनंद धारा व्ही-3 समोर,\nरत्न दीप फार्मच्या मागे, मोटा वराछा, सुरत.' },
        { heading: '', body: '*निमंत्रक*\nकै. गणेशभाई करशनभाई मावाणी (मो. 98765 43210)\nश्री. दिनेशभाई गणेशभाई मावाणी (मो. 91234 56789)' },
        { heading: '', body: '17, सौराष्ट्र बंगलोज, महाराज फार्मजवळ, मोटा वराछा, सुरत.\n[[3-rule]]' },
      ],
    },
    {
      title: 'जय श्री कृष्ण',
      sections: [{ heading: '', body: '**मावाणी परिवाराकडून**\n**जय श्री कृष्ण**' }],
    },
  ],
  pa: [
    {
      title: 'ਗੋਦ ਭਰਾਈ',
      sections: [{ heading: '', body: '[[1-title|**ਗੋਦ ਭਰਾਈ**]]' }, { heading: '', body: '[[1-rule]]\n***ਸ਼੍ਰੀਮਤੀ ਹਸਤੀ***\n[[1-rule]]' }],
    },
    {
      title: 'ਗੋਦ ਭਰਾਈ ਦੀ ਰਸਮ',
      sections: [
        { heading: '', body: '॥ ਸ਼੍ਰੀ ਗਣੇਸ਼ਾਯ ਨਮਃ ॥\n|| ਸ਼੍ਰੀ ਖੋਡਿਆਰ ਮਾਂ || <> || ਸ਼੍ਰੀ ਮਹਾਕਾਲੀ ਮਾਂ ||' },
        { heading: '', body: '[[2-title|**ਗੋਦ ਭਰਾਈ**]]' },
        { heading: '', body: 'ਬੜੀ ਖ਼ੁਸ਼ੀ ਨਾਲ ਦੱਸਦੇ ਹਾਂ ਕਿ ਸਾਡੀ ਕੁਲਦੇਵੀ ਸ਼੍ਰੀ ਖੋਡਿਆਰ ਮਾਤਾਜੀ\nਅਤੇ ਸ਼੍ਰੀ ਮਹਾਕਾਲੀ ਮਾਤਾਜੀ ਦੀ ਅਪਾਰ ਕਿਰਪਾ ਨਾਲ\nਸ਼੍ਰੀਮਤੀ ਮੁਕਤਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਦਿਨੇਸ਼ਭਾਈ ਗਣੇਸ਼ਭਾਈ ਮਾਵਾਣੀ ਦੇ ਸਪੁੱਤਰ' },
        { heading: '', body: '*ਚਿ. ਹਰਸ਼ਿਲ ਦੀ ਧਰਮਪਤਨੀ*' },
        { heading: '', body: '***ਸ਼੍ਰੀਮਤੀ ਹਸਤੀ***' },
        { heading: '', body: 'ਦੀ ਗੋਦ ਭਰਾਈ ਦਾ ਸ਼ੁਭ ਮਹੂਰਤ ਸੰਮਤ 2080 ਮਾਘ ਵਦੀ 7,\nਐਤਵਾਰ, ਮਿਤੀ 03-03-2024 ਦੇ ਸ਼ੁਭ ਦਿਨ ਨਿਸ਼ਚਿਤ ਕੀਤਾ ਹੈ।\nਇਸ ਸ਼ੁਭ ਮੌਕੇ ਤੇ ਆਸ਼ੀਰਵਾਦ ਦੇਣ ਲਈ ਜ਼ਰੂਰ ਪਧਾਰੋ ਜੀ।' },
      ],
    },
    {
      title: 'ਸੱਦਾ ਦੇਣ ਵਾਲੇ',
      sections: [
        { heading: '', body: '*ਪ੍ਰੀਤੀ ਭੋਜ*\nਮਿਤੀ 03-03-2024, ਐਤਵਾਰ ਨੂੰ ਸ਼ਾਮ 6:00 ਵਜੇ\nਪਧਾਰ ਕੇ ਸ਼ੋਭਾ ਵਧਾਓ ਜੀ।' },
        { heading: '', body: '*ਸਥਾਨ*\nਮਾਧਵ ਫਾਰਮ, ਆਨੰਦ ਧਾਰਾ ਵੀ-3 ਦੇ ਸਾਹਮਣੇ,\nਰਤਨ ਦੀਪ ਫਾਰਮ ਦੇ ਪਿੱਛੇ, ਮੋਟਾ ਵਰਾਛਾ, ਸੂਰਤ.' },
        { heading: '', body: '*ਸੱਦਾ ਦੇਣ ਵਾਲੇ*\nਸਵ. ਗਣੇਸ਼ਭਾਈ ਕਰਸ਼ਨਭਾਈ ਮਾਵਾਣੀ (ਫ਼ੋਨ: 98765 43210)\nਸ਼੍ਰੀ ਦਿਨੇਸ਼ਭਾਈ ਗਣੇਸ਼ਭਾਈ ਮਾਵਾਣੀ (ਫ਼ੋਨ: 91234 56789)' },
        { heading: '', body: '17, ਸੌਰਾਸ਼ਟਰ ਬੰਗਲੋਜ਼, ਮਹਾਰਾਜ ਫਾਰਮ ਦੇ ਕੋਲ, ਮੋਟਾ ਵਰਾਛਾ, ਸੂਰਤ.\n[[3-rule]]' },
      ],
    },
    {
      title: 'ਜੈ ਸ਼੍ਰੀ ਕ੍ਰਿਸ਼ਨਾ',
      sections: [{ heading: '', body: '**ਮਾਵਾਣੀ ਪਰਿਵਾਰ ਵੱਲੋਂ**\n**ਜੈ ਸ਼੍ਰੀ ਕ੍ਰਿਸ਼ਨਾ**' }],
    },
  ],
  ta: [
    {
      title: 'சீமந்தம்',
      sections: [{ heading: '', body: '[[1-title|**சீமந்தம்**]]' }, { heading: '', body: '[[1-rule]]\n***திருமதி ஹஸ்தி***\n[[1-rule]]' }],
    },
    {
      title: 'வளைகாப்பு விழா',
      sections: [
        { heading: '', body: '॥ ஸ்ரீ கணேசாய நமஃ ॥\n|| ஸ்ரீ கோடியார் மா || <> || ஸ்ரீ மகாகாளி மா ||' },
        { heading: '', body: '[[2-title|**சீமந்தம்**]]' },
        { heading: '', body: 'எங்கள் குலதெய்வம் ஸ்ரீ கோடியார் மாதாஜி\nமற்றும் ஸ்ரீ மகாகாளி மாதாஜியின் அளவற்ற அருளால்,\nதிருமதி முக்தாபென் - திரு தினேஷ்பாய் கணேஷ்பாய் மாவாணி அவர்களின் புதல்வர்' },
        { heading: '', body: '*சி. ஹர்ஷிலின் துணைவியார்*' },
        { heading: '', body: '***திருமதி ஹஸ்தி***' },
        { heading: '', body: 'அவர்களின் சீமந்த சுப முகூர்த்தம் சம்வத் 2080 மாக தேய்பிறை 7,\nஞாயிற்றுக்கிழமை, 03-03-2024 அன்று நிச்சயிக்கப்பட்டுள்ளது.\nஇந்த சுப நிகழ்வில் வந்து ஆசி வழங்க அன்புடன் அழைக்கிறோம்.' },
      ],
    },
    {
      title: 'அழைப்போர்',
      sections: [
        { heading: '', body: '*விருந்து*\n03-03-2024, ஞாயிற்றுக்கிழமை மாலை 6:00 மணிக்கு\nதாங்கள் வருகை தந்து சிறப்பிக்க வேண்டுகிறோம்.' },
        { heading: '', body: '*இடம்*\nமாதவ் ஃபார்ம், ஆனந்த் தாரா வி-3 எதிரில்,\nரத்ன தீப் ஃபார்ம் பின்புறம், மோட்டா வராச்சா, சூரத்.' },
        { heading: '', body: '*அழைப்போர்*\nஅமரர் கணேஷ்பாய் கர்ஷன்பாய் மாவாணி\n(தொ. 98765 43210)\nதிரு தினேஷ்பாய் கணேஷ்பாய் மாவாணி\n(தொ. 91234 56789)' },
        { heading: '', body: '17, சௌராஷ்டிர பங்களாஸ், மகாராஜ் ஃபார்ம் அருகில், மோட்டா வராச்சா, சூரத்.\n[[3-rule]]' },
      ],
    },
    {
      title: 'ஜெய் ஸ்ரீ கிருஷ்ணா',
      sections: [{ heading: '', body: '**மாவாணி குடும்பத்தின்**\n**ஜெய் ஸ்ரீ கிருஷ்ணா**' }],
    },
  ],
}
export default tr
