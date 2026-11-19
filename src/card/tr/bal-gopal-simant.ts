import type { Template } from '../../templates'

// The printed card's pages in every language but Gujarati: same pages, same sections, same marks; only the words change.
const tr: NonNullable<Template['tr']> = {
  en: [
    {
      title: 'Simant Sanskar',
      sections: [{ heading: '', body: '**Simant**\n**Sanskar**' }],
    },
    {
      title: 'Motherhood',
      sections: [
        { heading: '', body: 'The beauty of married life\nand its most fulfilling moment is' },
        { heading: '', body: '**Motherhood**' },
        { heading: '', body: '***wife of Chi. Harsh***' },
        { heading: '', body: '***Smt. Bhumi***' },
      ],
    },
    {
      title: 'Simant Ceremony',
      sections: [
        { heading: '', body: 'With great joy we share that by the boundless grace\nof our Kuldevi Shri Chamunda Mataji,\nson of Smt. Pushpaben and Shri Chandrakant Shelat' },
        { heading: '', body: '***Chi. Harsh***' },
        { heading: '', body: 'his wife' },
        { heading: '', body: '***Smt. Bhumi***' },
        { heading: '', body: 'will have her Simant ceremony on Vikram Samvat 2081,\nPhagun Vad 2, Sunday' },
      ],
    },
    {
      title: 'Auspicious Muhurat',
      sections: [
        { heading: '', body: '***Auspicious Muhurat***\n[[4-rule]]\nSunday, 16.03.2025\nat 9:30 AM' },
        { heading: '', body: '***Lunch***\n[[4-rule]]\nSunday, 16.03.2025\nat 12:00 noon' },
        { heading: '', body: '***Venue***\n[[4-rule]]\nRamodheshwari Hall,\nnext to Matariya Lake,\nLink Road, Bharuch 392001' },
      ],
    },
    {
      title: 'Thank You',
      sections: [
        { heading: '', body: '***Invited by***\n[[4-rule]]\nChandrakant D. Shelat\nMo. 98765 43210 . 91234 56789' },
        { heading: '', body: '[[5-thanks|**Thank You**]]' },
      ],
    },
  ],
  hi: [
    {
      title: 'सीमंत संस्कार',
      sections: [{ heading: '', body: '**सीमंत**\n**संस्कार**' }],
    },
    {
      title: 'मातृत्व',
      sections: [
        { heading: '', body: 'दाम्पत्य जीवन की सुंदरता\nऔर समृद्ध घड़ी है' },
        { heading: '', body: '**मातृत्व**' },
        { heading: '', body: '***चि. हर्ष की धर्मपत्नी***' },
        { heading: '', body: '***श्रीमती भूमि***' },
      ],
    },
    {
      title: 'सीमंत विधि',
      sections: [
        { heading: '', body: 'सहर्ष सूचित करते हैं कि हमारी कुलदेवी\nश्री चामुंडा माताजी की असीम कृपा से\nश्रीमती पुष्पाबेन एवं श्री चंद्रकांत शेलत के सुपुत्र' },
        { heading: '', body: '***चि. हर्ष***' },
        { heading: '', body: 'की धर्मपत्नी' },
        { heading: '', body: '***श्रीमती भूमि***' },
        { heading: '', body: 'की सीमंत विधि का मुहूर्त विक्रम संवत 2081\nफाल्गुन वदी द्वितीया, रविवार' },
      ],
    },
    {
      title: 'शुभ मुहूर्त',
      sections: [
        { heading: '', body: '***शुभ मुहूर्त***\n[[4-rule]]\nरविवार, दि. 16.03.2025 को\nप्रातः 9:30 बजे' },
        { heading: '', body: '***भोजन समारोह***\n[[4-rule]]\nरविवार, दि. 16.03.2025 को\nदोपहर 12:00 बजे' },
        { heading: '', body: '***शुभ स्थल***\n[[4-rule]]\nरमोढेश्वरी हॉल,\nमातरिया तालाब के पास,\nलिंक रोड, भरूच 392001' },
      ],
    },
    {
      title: 'आभार',
      sections: [
        { heading: '', body: '***निमंत्रक***\n[[4-rule]]\nचंद्रकांत डी. शेलत\nमो. 98765 43210 . 91234 56789' },
        { heading: '', body: '[[5-thanks|**Thank You**]]' },
      ],
    },
  ],
  mr: [
    {
      title: 'सीमंत संस्कार',
      sections: [{ heading: '', body: '**सीमंत**\n**संस्कार**' }],
    },
    {
      title: 'मातृत्व',
      sections: [
        { heading: '', body: 'दांपत्य जीवनाचे सौंदर्य\nआणि समृद्ध क्षण म्हणजे' },
        { heading: '', body: '**मातृत्व**' },
        { heading: '', body: '***चि. हर्ष यांच्या धर्मपत्नी***' },
        { heading: '', body: '***अ.सौ. भूमी***' },
      ],
    },
    {
      title: 'डोहाळे जेवण',
      sections: [
        { heading: '', body: 'कळविण्यास आनंद होतो की आमची कुलदेवी\nश्री चामुंडा मातेच्या असीम कृपेने\nअ.सौ. पुष्पाबेन व श्री. चंद्रकांत शेलत यांचे सुपुत्र' },
        { heading: '', body: '***चि. हर्ष***' },
        { heading: '', body: 'यांच्या धर्मपत्नी' },
        { heading: '', body: '***अ.सौ. भूमी***' },
        { heading: '', body: 'यांच्या डोहाळे जेवणाचा मुहूर्त विक्रम संवत 2081\nफाल्गुन वद्य द्वितीया, रविवार' },
      ],
    },
    {
      title: 'शुभ मुहूर्त',
      sections: [
        { heading: '', body: '***शुभ मुहूर्त***\n[[4-rule]]\nरविवार, दि. 16.03.2025 रोजी\nसकाळी 9:30 वाजता' },
        { heading: '', body: '***भोजन समारंभ***\n[[4-rule]]\nरविवार, दि. 16.03.2025 रोजी\nदुपारी 12:00 वाजता' },
        { heading: '', body: '***शुभ स्थळ***\n[[4-rule]]\nरमोढेश्वरी हॉल,\nमातरिया तलावाशेजारी,\nलिंक रोड, भरूच 392001' },
      ],
    },
    {
      title: 'आभार',
      sections: [
        { heading: '', body: '***निमंत्रक***\n[[4-rule]]\nचंद्रकांत डी. शेलत\nमो. 98765 43210 . 91234 56789' },
        { heading: '', body: '[[5-thanks|**Thank You**]]' },
      ],
    },
  ],
  pa: [
    {
      title: 'ਗੋਦ ਭਰਾਈ',
      sections: [{ heading: '', body: '**ਗੋਦ**\n**ਭਰਾਈ**' }],
    },
    {
      title: 'ਮਮਤਾ',
      sections: [
        { heading: '', body: 'ਵਿਆਹੁਤਾ ਜੀਵਨ ਦੀ ਸੁੰਦਰਤਾ\nਅਤੇ ਖ਼ੁਸ਼ਹਾਲ ਘੜੀ ਹੈ' },
        { heading: '', body: '**ਮਮਤਾ**' },
        { heading: '', body: '***ਚਿ. ਹਰਸ਼ ਦੀ ਧਰਮਪਤਨੀ***' },
        { heading: '', body: '***ਸ਼੍ਰੀਮਤੀ ਭੂਮੀ***' },
      ],
    },
    {
      title: 'ਗੋਦ ਭਰਾਈ ਦੀ ਰਸਮ',
      sections: [
        { heading: '', body: 'ਬੜੀ ਖ਼ੁਸ਼ੀ ਨਾਲ ਸੂਚਿਤ ਕਰਦੇ ਹਾਂ ਕਿ ਸਾਡੀ ਕੁਲਦੇਵੀ\nਸ਼੍ਰੀ ਚਾਮੁੰਡਾ ਮਾਤਾ ਜੀ ਦੀ ਅਸੀਮ ਕਿਰਪਾ ਨਾਲ\nਸ਼੍ਰੀਮਤੀ ਪੁਸ਼ਪਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਚੰਦਰਕਾਂਤ ਸ਼ੇਲਤ ਦੇ ਸਪੁੱਤਰ' },
        { heading: '', body: '***ਚਿ. ਹਰਸ਼***' },
        { heading: '', body: 'ਦੀ ਧਰਮਪਤਨੀ' },
        { heading: '', body: '***ਸ਼੍ਰੀਮਤੀ ਭੂਮੀ***' },
        { heading: '', body: 'ਦੀ ਗੋਦ ਭਰਾਈ ਦਾ ਮਹੂਰਤ ਵਿਕਰਮ ਸੰਮਤ 2081\nਫੱਗਣ ਵਦੀ ਦੂਜ, ਐਤਵਾਰ' },
      ],
    },
    {
      title: 'ਸ਼ੁਭ ਮਹੂਰਤ',
      sections: [
        { heading: '', body: '***ਸ਼ੁਭ ਮਹੂਰਤ***\n[[4-rule]]\nਐਤਵਾਰ, 16.03.2025 ਨੂੰ\nਸਵੇਰੇ 9:30 ਵਜੇ' },
        { heading: '', body: '***ਭੋਜਨ***\n[[4-rule]]\nਐਤਵਾਰ, 16.03.2025 ਨੂੰ\nਦੁਪਹਿਰ 12:00 ਵਜੇ' },
        { heading: '', body: '***ਸ਼ੁਭ ਸਥਾਨ***\n[[4-rule]]\nਰਮੋਢੇਸ਼ਵਰੀ ਹਾਲ,\nਮਾਤਰੀਆ ਤਲਾਅ ਦੇ ਨਾਲ,\nਲਿੰਕ ਰੋਡ, ਭਰੂਚ 392001' },
      ],
    },
    {
      title: 'ਧੰਨਵਾਦ',
      sections: [
        { heading: '', body: '***ਸੱਦਾ ਦੇਣ ਵਾਲੇ***\n[[4-rule]]\nਚੰਦਰਕਾਂਤ ਡੀ. ਸ਼ੇਲਤ\nਫ਼ੋਨ: 98765 43210 . 91234 56789' },
        { heading: '', body: '[[5-thanks|**Thank You**]]' },
      ],
    },
  ],
  ta: [
    {
      title: 'சீமந்தம்',
      sections: [{ heading: '', body: '**சீமந்த**\n**சம்ஸ்காரம்**' }],
    },
    {
      title: 'தாய்மை',
      sections: [
        { heading: '', body: 'இல்லற வாழ்வின் அழகும்\nவளமும் நிறைந்த தருணம் என்பது' },
        { heading: '', body: '**தாய்மை**' },
        { heading: '', body: '***சி. ஹர்ஷ் அவர்களின் துணைவி***' },
        { heading: '', body: '***திருமதி பூமி***' },
      ],
    },
    {
      title: 'வளைகாப்பு விழா',
      sections: [
        { heading: '', body: 'மிக்க மகிழ்ச்சியுடன் தெரிவிப்பது, எங்கள் குலதெய்வம்\nஸ்ரீ சாமுண்டா அன்னையின் அளவற்ற அருளால்\nதிருமதி புஷ்பாபென், திரு சந்திரகாந்த் ஷேலத் அவர்களின் மகன்' },
        { heading: '', body: '***சி. ஹர்ஷ்***' },
        { heading: '', body: 'அவர்களின் துணைவி' },
        { heading: '', body: '***திருமதி பூமி***' },
        { heading: '', body: 'அவர்களின் வளைகாப்பு முகூர்த்தம் விக்ரம் சம்வத் 2081\nபங்குனி கிருஷ்ண துவிதியை, ஞாயிறு' },
      ],
    },
    {
      title: 'சுப முகூர்த்தம்',
      sections: [
        { heading: '', body: '***சுப முகூர்த்தம்***\n[[4-rule]]\nஞாயிறு, 16.03.2025 அன்று\nகாலை 9:30 மணிக்கு' },
        { heading: '', body: '***விருந்து***\n[[4-rule]]\nஞாயிறு, 16.03.2025 அன்று\nமதியம் 12:00 மணிக்கு' },
        { heading: '', body: '***இடம்***\n[[4-rule]]\nரமோடேஷ்வரி ஹால்,\nமாதரியா ஏரி அருகில்,\nலிங்க் ரோடு, பரூச் 392001' },
      ],
    },
    {
      title: 'நன்றி',
      sections: [
        { heading: '', body: '***அழைப்போர்***\n[[4-rule]]\nசந்திரகாந்த் டி. ஷேலத்\nதொலைபேசி: 98765 43210 . 91234 56789' },
        { heading: '', body: '[[5-thanks|**Thank You**]]' },
      ],
    },
  ],
}
export default tr
