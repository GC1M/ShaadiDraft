import type { Template } from '../../templates'

// The printed card's pages in every language but Gujarati: same pages, same sections, same marks; only the words change.
const tr: NonNullable<Template['tr']> = {
  en: [
    {
      title: 'Simant Sanskar',
      sections: [
        { heading: '', body: '*|| Shri Ganeshaya Namah ||*' },
        { heading: '', body: '[[1-ganesh]]' },
        { heading: '', body: '[[1-title|**Simant Sanskar**]]' },
        { heading: '', body: 'With great joy we share that\nby the boundless grace of Bhagwan Shri Ranchhodrai,\nson of Smt. Nikitaben and Shri Dilipbhai Patel' },
        { heading: '', body: '*wife of Chi. Dhaval*\n[[1-girl]] **Smt. Prinsu** [[1-boy]]' },
        { heading: '', body: 'will have her Simant ceremony on Vaishakh Vad 5, Samvat 2080,\nTuesday, 28-05-2024, at 10:00 AM.\nWe warmly invite you and your family to come and bless her.' },
        { heading: '', body: '[[1-rule]]\n**Lunch**\nat 12:00 noon\n[[1-rule]]' },
        { heading: '', body: '**Venue**\n"Grand Darshan" Tarsali Bypass,\nNHP 48, between Kapurai and Tarsali bridges, Vadodara.\n[[1-rule]]' },
        { heading: '', body: '**Invited by**' },
        {
          heading: '',
          body: 'Shri Ghanshyambhai Ranchhodbhai Patel\nShri Sureshbhai Girdharbhai Patel\nShri Dilipbhai Ranchhodbhai Patel\nShri Girishbhai Girdharbhai Patel\nSmt. Gitaben Ghanshyambhai Patel\nSmt. Komalben Sureshbhai Patel\nSmt. Nikitaben Dilipbhai Patel\nSmt. Kirtikaben Girishbhai Patel',
        },
      ],
    },
  ],
  hi: [
    {
      title: 'सीमंत संस्कार',
      sections: [
        { heading: '', body: '*॥ श्री गणेशाय नमः ॥*' },
        { heading: '', body: '[[1-ganesh]]' },
        { heading: '', body: '[[1-title|**सीमंत संस्कार**]]' },
        { heading: '', body: 'सहर्ष सूचित करते हैं कि\nभगवान श्री रणछोड़राय की असीम कृपा से\nश्रीमती निकिताबेन एवं श्री दिलीपभाई पटेल के सुपुत्र' },
        { heading: '', body: '*चि. धवल की धर्मपत्नी*\n[[1-girl]] **श्रीमती प्रिंसु** [[1-boy]]' },
        { heading: '', body: 'के सीमंत संस्कार का शुभ मुहूर्त संवत 2080 वैशाख कृष्ण पंचमी,\nमंगलवार, दिनांक 28-05-2024 को प्रातः 10:00 बजे रखा है।\nअतः इस शुभ अवसर पर आप सपरिवार आशीर्वाद देने पधारें।' },
        { heading: '', body: '[[1-rule]]\n**भोजन समारोह**\nदोपहर 12:00 बजे\n[[1-rule]]' },
        { heading: '', body: '**शुभ स्थल**\n"Grand Darshan" तरसाली बायपास,\nNHP 48, कपुराई और तरसाली ब्रिज के बीच, वडोदरा।\n[[1-rule]]' },
        { heading: '', body: '**निमंत्रक**' },
        {
          heading: '',
          body: 'श्री घनश्यामभाई रणछोड़भाई पटेल\nश्री सुरेशभाई गिरधरभाई पटेल\nश्री दिलीपभाई रणछोड़भाई पटेल\nश्री गिरीशभाई गिरधरभाई पटेल\nश्रीमती गीताबेन घनश्यामभाई पटेल\nश्रीमती कोमलबेन सुरेशभाई पटेल\nश्रीमती निकिताबेन दिलीपभाई पटेल\nश्रीमती कीर्तिकाबेन गिरीशभाई पटेल',
        },
      ],
    },
  ],
  mr: [
    {
      title: 'डोहाळे जेवण',
      sections: [
        { heading: '', body: '*॥ श्री गणेशाय नमः ॥*' },
        { heading: '', body: '[[1-ganesh]]' },
        { heading: '', body: '[[1-title|**डोहाळे जेवण**]]' },
        { heading: '', body: 'कळविण्यास अत्यंत आनंद होतो की\nभगवान श्री रणछोडराय यांच्या असीम कृपेने\nसौ. निकिताबेन व श्री. दिलीपभाई पटेल यांचे सुपुत्र' },
        { heading: '', body: '*चि. धवल यांच्या धर्मपत्नी*\n[[1-girl]] **सौ. प्रिन्सु** [[1-boy]]' },
        { heading: '', body: 'यांच्या सीमंत विधीचा शुभ मुहूर्त संवत 2080 वैशाख वद्य पंचमी,\nमंगळवार, दि. 28-05-2024 रोजी सकाळी 10:00 वा. ठेवला आहे.\nतरी या शुभ प्रसंगी आपण सहपरिवार आशीर्वाद देण्यास यावे.' },
        { heading: '', body: '[[1-rule]]\n**भोजन समारंभ**\nदुपारी 12:00 वा.\n[[1-rule]]' },
        { heading: '', body: '**शुभ स्थळ**\n"Grand Darshan" तरसाली बायपास,\nNHP 48, कपुराई व तरसाली पुलाच्या दरम्यान, वडोदरा.\n[[1-rule]]' },
        { heading: '', body: '**निमंत्रक**' },
        {
          heading: '',
          body: 'श्री. घनश्यामभाई रणछोडभाई पटेल\nश्री. सुरेशभाई गिरधरभाई पटेल\nश्री. दिलीपभाई रणछोडभाई पटेल\nश्री. गिरीशभाई गिरधरभाई पटेल\nसौ. गीताबेन घनश्यामभाई पटेल\nसौ. कोमलबेन सुरेशभाई पटेल\nसौ. निकिताबेन दिलीपभाई पटेल\nसौ. कीर्तिकाबेन गिरीशभाई पटेल',
        },
      ],
    },
  ],
  pa: [
    {
      title: 'ਗੋਦ ਭਰਾਈ',
      sections: [
        { heading: '', body: '*॥ ਸ਼੍ਰੀ ਗਣੇਸ਼ਾਯ ਨਮਃ ॥*' },
        { heading: '', body: '[[1-ganesh]]' },
        { heading: '', body: '[[1-title|**ਗੋਦ ਭਰਾਈ**]]' },
        { heading: '', body: 'ਬੜੀ ਖੁਸ਼ੀ ਨਾਲ ਸੂਚਿਤ ਕਰਦੇ ਹਾਂ ਕਿ\nਭਗਵਾਨ ਸ਼੍ਰੀ ਰਣਛੋੜਰਾਇ ਦੀ ਅਪਾਰ ਕਿਰਪਾ ਨਾਲ\nਸ਼੍ਰੀਮਤੀ ਨਿਕਿਤਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਦਿਲੀਪਭਾਈ ਪਟੇਲ ਦੇ ਸਪੁੱਤਰ' },
        { heading: '', body: '*ਚਿ. ਧਵਲ ਦੀ ਧਰਮਪਤਨੀ*\n[[1-girl]] **ਸ਼੍ਰੀਮਤੀ ਪ੍ਰਿੰਸੂ** [[1-boy]]' },
        { heading: '', body: 'ਦੀ ਗੋਦ ਭਰਾਈ ਦਾ ਸ਼ੁਭ ਮਹੂਰਤ ਸੰਵਤ 2080 ਵੈਸਾਖ ਵਦੀ ਪੰਚਮੀ,\nਮੰਗਲਵਾਰ, ਮਿਤੀ 28-05-2024 ਨੂੰ ਸਵੇਰੇ 10:00 ਵਜੇ ਰੱਖਿਆ ਹੈ।\nਇਸ ਸ਼ੁਭ ਮੌਕੇ ਤੇ ਆਪ ਸਪਰਿਵਾਰ ਅਸੀਸ ਦੇਣ ਲਈ ਪਧਾਰਨਾ ਜੀ।' },
        { heading: '', body: '[[1-rule]]\n**ਪ੍ਰੀਤੀ ਭੋਜ**\nਦੁਪਹਿਰ 12:00 ਵਜੇ\n[[1-rule]]' },
        { heading: '', body: '**ਸ਼ੁਭ ਸਥਾਨ**\n"Grand Darshan" ਤਰਸਾਲੀ ਬਾਈਪਾਸ,\nNHP 48, ਕਪੁਰਾਈ ਅਤੇ ਤਰਸਾਲੀ ਪੁਲ ਦੇ ਵਿਚਕਾਰ, ਵਡੋਦਰਾ।\n[[1-rule]]' },
        { heading: '', body: '**ਸੱਦਾ ਦੇਣ ਵਾਲੇ**' },
        {
          heading: '',
          body: 'ਸ਼੍ਰੀ ਘਨਸ਼ਿਆਮਭਾਈ ਰਣਛੋੜਭਾਈ ਪਟੇਲ\nਸ਼੍ਰੀ ਸੁਰੇਸ਼ਭਾਈ ਗਿਰਧਰਭਾਈ ਪਟੇਲ\nਸ਼੍ਰੀ ਦਿਲੀਪਭਾਈ ਰਣਛੋੜਭਾਈ ਪਟੇਲ\nਸ਼੍ਰੀ ਗਿਰੀਸ਼ਭਾਈ ਗਿਰਧਰਭਾਈ ਪਟੇਲ\nਸ਼੍ਰੀਮਤੀ ਗੀਤਾਬੇਨ ਘਨਸ਼ਿਆਮਭਾਈ ਪਟੇਲ\nਸ਼੍ਰੀਮਤੀ ਕੋਮਲਬੇਨ ਸੁਰੇਸ਼ਭਾਈ ਪਟੇਲ\nਸ਼੍ਰੀਮਤੀ ਨਿਕਿਤਾਬੇਨ ਦਿਲੀਪਭਾਈ ਪਟੇਲ\nਸ਼੍ਰੀਮਤੀ ਕੀਰਤਿਕਾਬੇਨ ਗਿਰੀਸ਼ਭਾਈ ਪਟੇਲ',
        },
      ],
    },
  ],
  ta: [
    {
      title: 'வளைகாப்பு',
      sections: [
        { heading: '', body: '*॥ ஸ்ரீ கணேசாய நமஃ ॥*' },
        { heading: '', body: '[[1-ganesh]]' },
        { heading: '', body: '[[1-title|**வளைகாப்பு**]]' },
        { heading: '', body: 'மிக்க மகிழ்ச்சியுடன் தெரிவிப்பது யாதெனில்,\nபகவான் ஸ்ரீ ரண்சோட்ராயின் பேரருளால்\nதிருமதி நிகிதாபென் & திரு திலீப்பாய் படேல் அவர்களின் புதல்வன்' },
        { heading: '', body: '*சி. தவல் அவர்களின் துணைவியார்*\n[[1-girl]] **திருமதி பிரின்சு** [[1-boy]]' },
        { heading: '', body: 'அவர்களின் சீமந்தம் சம்வத் 2080 வைசாக தேய்பிறை பஞ்சமி,\nசெவ்வாய்க்கிழமை, 28-05-2024 அன்று காலை 10:00 மணிக்கு நடைபெறும்.\nஇம்மங்கல நிகழ்வில் தாங்கள் குடும்பத்துடன் வந்து ஆசீர்வதியுங்கள்.' },
        { heading: '', body: '[[1-rule]]\n**விருந்து**\nமதியம் 12:00 மணி\n[[1-rule]]' },
        { heading: '', body: '**இடம்**\n"Grand Darshan" தர்சாலி பைபாஸ்,\nNHP 48, கபுராய் - தர்சாலி பாலங்களுக்கு இடையே, வடோதரா.\n[[1-rule]]' },
        { heading: '', body: '**அழைப்போர்**' },
        {
          heading: '',
          body: 'திரு கனஷ்யாம்பாய் ரண்சோட்பாய் படேல்\nதிரு சுரேஷ்பாய் கிர்தர்பாய் படேல்\nதிரு திலீப்பாய் ரண்சோட்பாய் படேல்\nதிரு கிரீஷ்பாய் கிர்தர்பாய் படேல்\nதிருமதி கீதாபென் கனஷ்யாம்பாய் படேல்\nதிருமதி கோமல்பென் சுரேஷ்பாய் படேல்\nதிருமதி நிகிதாபென் திலீப்பாய் படேல்\nதிருமதி கீர்த்திகாபென் கிரீஷ்பாய் படேல்',
        },
      ],
    },
  ],
}
export default tr
