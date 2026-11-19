import type { Template } from '../../templates'

// The printed card's pages in every language but Gujarati: same pages, same sections, same marks; only the words change.
const tr: NonNullable<Template['tr']> = {
  en: [
    {
      title: 'Simant Sanskar',
      sections: [
        { heading: '', body: '**|| Shri Ganeshaya Namah ||**' },
        { heading: '', body: '**Simant Sanskar**' },
        { heading: '', body: 'With great joy we share that\nby the boundless grace of Bhagwan Shri Ranchhodrai,\nthe son of A.Sau. Nikitaben and Shri Dilipbhai Patel,' },
        { heading: '', body: '*wife of Chi. Dhaval*' },
        { heading: '', body: '*A.Sau. Prinsu*' },
        { heading: '', body: 'will have her Simant ceremony on Vaishakh Vad 5, Samvat 2082,\nTuesday, 17.11.2026, at 9:00 AM.\nPlease come with your family to bless her on this happy occasion.' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**Lunch**\nat 11:00 AM' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**Venue**\n"Grand Darshan"\nTarsali Bypass,\nNHP 48, between Kapurai\nand Tarsali bridges, Vadodara.\n[[1-rule]]' },
      ],
    },
  ],
  hi: [
    {
      title: 'सीमंत संस्कार',
      sections: [
        { heading: '', body: '**॥ श्री गणेशाय नमः ॥**' },
        { heading: '', body: '**सीमंत संस्कार**' },
        { heading: '', body: 'सहर्ष सूचित करते हैं कि\nभगवान श्री रणछोड़राय की असीम कृपा से\nअ.सौ. निकिताबेन तथा श्री दिलीपभाई पटेल के सुपुत्र' },
        { heading: '', body: '*चि. धवल की धर्मपत्नी*' },
        { heading: '', body: '*अ.सौ. प्रिंसु*' },
        { heading: '', body: 'के सीमंत संस्कार का शुभ मुहूर्त संवत 2082, वैशाख कृष्ण पंचमी,\nमंगलवार, दिनांक 17.11.2026 को प्रातः 9:00 बजे रखा गया है।\nअतः इस शुभ अवसर पर सपरिवार आशीर्वाद देने अवश्य पधारें।' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**भोजन समारोह**\nप्रातः 11:00 बजे' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**शुभ स्थल**\n"Grand Darshan"\nतरसाली बायपास,\nNHP 48 कपुराई और तरसाली\nब्रिज के बीच, वडोदरा.\n[[1-rule]]' },
      ],
    },
  ],
  mr: [
    {
      title: 'सीमंत संस्कार',
      sections: [
        { heading: '', body: '**॥ श्री गणेशाय नमः ॥**' },
        { heading: '', body: '**सीमंत संस्कार**' },
        { heading: '', body: 'कळविण्यास अत्यंत आनंद होतो की\nभगवान श्री रणछोडराय यांच्या असीम कृपेने\nअ.सौ. निकिताबेन व श्री. दिलीपभाई पटेल यांचे सुपुत्र' },
        { heading: '', body: '*चि. धवल यांच्या धर्मपत्नी*' },
        { heading: '', body: '*अ.सौ. प्रिन्सु*' },
        { heading: '', body: 'यांच्या सीमंत संस्काराचा शुभ मुहूर्त संवत 2082 वैशाख वद्य पंचमी,\nमंगळवार, दि. 17.11.2026 रोजी सकाळी 9:00 वाजता ठेवला आहे.\nतरी या शुभ प्रसंगी सहकुटुंब आशीर्वाद देण्यास अवश्य यावे.' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**भोजन समारंभ**\nसकाळी 11:00 वाजता' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**शुभ स्थळ**\n"Grand Darshan"\nतरसाली बायपास,\nNHP 48 कपुराई व तरसाली\nपुलांच्या मध्ये, वडोदरा.\n[[1-rule]]' },
      ],
    },
  ],
  pa: [
    {
      title: 'ਗੋਦ ਭਰਾਈ',
      sections: [
        { heading: '', body: '**॥ ਸ਼੍ਰੀ ਗਣੇਸ਼ਾਯ ਨਮਃ ॥**' },
        { heading: '', body: '**ਗੋਦ ਭਰਾਈ**' },
        { heading: '', body: 'ਬੜੀ ਖ਼ੁਸ਼ੀ ਨਾਲ ਦੱਸਦੇ ਹਾਂ ਕਿ\nਭਗਵਾਨ ਸ਼੍ਰੀ ਰਣਛੋੜਰਾਇ ਦੀ ਅਪਾਰ ਕਿਰਪਾ ਨਾਲ\nਸ਼੍ਰੀਮਤੀ ਨਿਕਿਤਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਦਿਲੀਪਭਾਈ ਪਟੇਲ ਦੇ ਸਪੁੱਤਰ' },
        { heading: '', body: '*ਚਿ. ਧਵਲ ਦੀ ਧਰਮਪਤਨੀ*' },
        { heading: '', body: '*ਸ਼੍ਰੀਮਤੀ ਪ੍ਰਿੰਸੂ*' },
        { heading: '', body: 'ਦੀ ਗੋਦ ਭਰਾਈ ਦਾ ਸ਼ੁਭ ਮਹੂਰਤ ਸੰਮਤ 2082 ਵੈਸਾਖ ਵਦੀ ਪੰਚਮੀ,\nਮੰਗਲਵਾਰ, ਮਿਤੀ 17.11.2026 ਨੂੰ ਸਵੇਰੇ 9:00 ਵਜੇ ਰੱਖਿਆ ਹੈ।\nਇਸ ਸ਼ੁਭ ਮੌਕੇ ਤੇ ਪਰਿਵਾਰ ਸਮੇਤ ਆਸ਼ੀਰਵਾਦ ਦੇਣ ਜ਼ਰੂਰ ਪਧਾਰੋ ਜੀ।' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**ਭੋਜਨ ਸਮਾਰੋਹ**\nਸਵੇਰੇ 11:00 ਵਜੇ' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**ਸ਼ੁਭ ਸਥਾਨ**\n"Grand Darshan"\nਤਰਸਾਲੀ ਬਾਈਪਾਸ,\nNHP 48 ਕਪੁਰਾਈ ਅਤੇ ਤਰਸਾਲੀ\nਪੁਲਾਂ ਦੇ ਵਿਚਕਾਰ, ਵਡੋਦਰਾ.\n[[1-rule]]' },
      ],
    },
  ],
  ta: [
    {
      title: 'சீமந்தம்',
      sections: [
        { heading: '', body: '**॥ ஸ்ரீ கணேசாய நமஃ ॥**' },
        { heading: '', body: '**சீமந்தம்**' },
        { heading: '', body: 'மகிழ்ச்சியுடன் தெரிவித்துக்கொள்கிறோம்,\nபகவான் ஸ்ரீ ரண்சோட்ராயின் அளவற்ற அருளால்\nதிருமதி நிகிதாபென் - திரு திலீப்பாய் படேல் அவர்களின் புதல்வர்' },
        { heading: '', body: '*சி. தவலின் துணைவியார்*' },
        { heading: '', body: '*திருமதி பிரின்சு*' },
        { heading: '', body: 'அவர்களின் சீமந்த சுப முகூர்த்தம் சம்வத் 2082 வைகாசி தேய்பிறை பஞ்சமி,\nசெவ்வாய்க்கிழமை, 17.11.2026 காலை 9:00 மணிக்கு நடைபெறும்.\nஇந்த சுப நிகழ்வில் குடும்பத்துடன் வந்து ஆசி வழங்க அழைக்கிறோம்.' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**விருந்து**\nகாலை 11:00 மணிக்கு' },
        { heading: ' ', body: ' ' },
        { heading: '[[1-rule]]', body: '**சுப இடம்**\n"Grand Darshan"\nதர்சாலி பைபாஸ்,\nNHP 48 கபுராய் மற்றும்\nதர்சாலி பாலங்களிடையே, வதோதரா.\n[[1-rule]]' },
      ],
    },
  ],
}
export default tr
