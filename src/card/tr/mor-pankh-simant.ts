import type { Template } from '../../templates'

// The printed card's pages in every language but Gujarati: same pages, same sections, same marks; only the words change.
const tr: NonNullable<Template['tr']> = {
  en: [
    {
      title: 'Invitation',
      sections: [
        { heading: '', body: '|| Shri Ganeshaya Namah ||\n|| Shrinathji Bava || <> || Shri Umiya Maa ||' },
        { heading: '', body: '[[1-title|**Invitation**]]' },
        { heading: '', body: 'The most beautiful, blessed moment of married life is...' },
        { heading: '', body: '**“Motherhood”**' },
        { heading: '', body: 'The proud, auspicious moment of first motherhood is' },
        { heading: '', body: '**“Simant Sanskar”**\n[[1-flourish]]' },
        { heading: '', body: 'With great joy we share that, by the boundless grace\nof our Kuldevi Shri Shrinathji Bava and Umiya Mataji,\nthe son of Shri Alpaben and Shri Shaileshbhai\nJivanbhai Vachhani,' },
        { heading: '', body: '***wife of Chi. Aarzu***' },
        { heading: '', body: '***Smt. Roshni***' },
      ],
    },
    {
      title: 'Invited by',
      sections: [
        { heading: '', body: '**Dinner**\n[[1-flourish]]\nSunday, 04-05-2025,\nat 6:30 in the evening\nyou are warmly invited.' },
        { heading: '', body: '**Venue**\n[[1-flourish]]\nAt our residence,\nD - 404, Vedant Elegance,\nnear the lake, Mota Varachha, Surat.' },
        { heading: '', body: '**Invited by**\n[[1-flourish]]\nShri Shaileshbhai Jivanbhai Vachhani\nShri Alpaben Shaileshbhai Vachhani\nShri Khushi Shaileshbhai Vachhani\n(98765 43210)' },
      ],
    },
  ],
  hi: [
    {
      title: 'आमंत्रण',
      sections: [
        { heading: '', body: '॥ श्री गणेशाय नमः ॥\n॥ श्रीनाथजी बावा ॥ <> ॥ श्री उमिया माँ ॥' },
        { heading: '', body: '[[1-title|**आमंत्रण**]]' },
        { heading: '', body: 'दांपत्य जीवन की सुंदर और समृद्ध घड़ी यानी...' },
        { heading: '', body: '**“मातृत्व”**' },
        { heading: '', body: 'प्रथम मातृत्व प्राप्ति का गौरवमय शुभ क्षण यानी' },
        { heading: '', body: '**“सीमंत संस्कार”**\n[[1-flourish]]' },
        { heading: '', body: 'सहर्ष सूचित करते हैं कि हमारे कुलदेव\nश्री श्रीनाथजी बावा एवं उमिया माताजी की\nअसीम कृपा से श्रीमती अल्पाबेन एवं श्री शैलेषभाई\nजीवनभाई वाछाणी के सुपुत्र' },
        { heading: '', body: '***चि. आरज़ू की धर्मपत्नी***' },
        { heading: '', body: '***अ.सौ. रोशनी***' },
      ],
    },
    {
      title: 'निमंत्रक',
      sections: [
        { heading: '', body: '**स्वरुचि भोज**\n[[1-flourish]]\nदि. 04-05-2025, रविवार,\nको सायं 6:30 बजे\nआप सादर पधारें।' },
        { heading: '', body: '**शुभ स्थान**\n[[1-flourish]]\nहमारे निवास स्थान पर,\nD - 404, वेदांत एलिगेंस,\nमोटा वराछा, तालाब के पास, सूरत।' },
        { heading: '', body: '**निमंत्रक**\n[[1-flourish]]\nश्री शैलेषभाई जीवनभाई वाछाणी\nश्रीमती अल्पाबेन शैलेषभाई वाछाणी\nसुश्री खुशी शैलेषभाई वाछाणी\n(98765 43210)' },
      ],
    },
  ],
  mr: [
    {
      title: 'आमंत्रण',
      sections: [
        { heading: '', body: '॥ श्री गणेशाय नमः ॥\n॥ श्रीनाथजी बावा ॥ <> ॥ श्री उमिया माँ ॥' },
        { heading: '', body: '[[1-title|**आमंत्रण**]]' },
        { heading: '', body: 'दांपत्य जीवनातील सुंदर आणि समृद्ध क्षण म्हणजे...' },
        { heading: '', body: '**“मातृत्व”**' },
        { heading: '', body: 'प्रथम मातृत्व प्राप्तीचा अभिमानास्पद शुभ क्षण म्हणजे' },
        { heading: '', body: '**“डोहाळे जेवण”**\n[[1-flourish]]' },
        { heading: '', body: 'कळविण्यास अत्यंत आनंद होतो की आमचे कुलदैवत\nश्री श्रीनाथजी बावा व उमिया माताजी यांच्या\nअसीम कृपेने श्रीमती अल्पाबेन व श्री. शैलेषभाई\nजीवनभाई वाछाणी यांचे सुपुत्र' },
        { heading: '', body: '***चि. आरझू यांच्या धर्मपत्नी***' },
        { heading: '', body: '***अ.सौ. रोशनी***' },
      ],
    },
    {
      title: 'निमंत्रक',
      sections: [
        { heading: '', body: '**स्नेहभोजन**\n[[1-flourish]]\nदि. 04-05-2025, रविवार,\nरोजी सायं. 6:30 वाजता\nआपण अवश्य यावे.' },
        { heading: '', body: '**शुभ स्थळ**\n[[1-flourish]]\nआमच्या निवासस्थानी,\nD - 404, वेदांत एलिगन्स,\nमोटा वराछा, तलावाजवळ, सूरत.' },
        { heading: '', body: '**निमंत्रक**\n[[1-flourish]]\nश्री. शैलेषभाई जीवनभाई वाछाणी\nश्रीमती अल्पाबेन शैलेषभाई वाछाणी\nकु. खुशी शैलेषभाई वाछाणी\n(98765 43210)' },
      ],
    },
  ],
  pa: [
    {
      title: 'ਸੱਦਾ ਪੱਤਰ',
      sections: [
        { heading: '', body: '॥ ਸ਼੍ਰੀ ਗਣੇਸ਼ਾਯ ਨਮਃ ॥\n॥ ਸ਼੍ਰੀਨਾਥਜੀ ਬਾਵਾ ॥ <> ॥ ਸ਼੍ਰੀ ਉਮੀਆ ਮਾਂ ॥' },
        { heading: '', body: '[[1-title|**ਸੱਦਾ ਪੱਤਰ**]]' },
        { heading: '', body: 'ਵਿਆਹੁਤਾ ਜੀਵਨ ਦੀ ਸੁੰਦਰ ਅਤੇ ਖੁਸ਼ਹਾਲ ਘੜੀ ਯਾਨੀ...' },
        { heading: '', body: '**“ਮਾਂ ਬਣਨਾ”**' },
        { heading: '', body: 'ਪਹਿਲੀ ਵਾਰ ਮਾਂ ਬਣਨ ਦਾ ਮਾਣਮੱਤਾ ਸ਼ੁਭ ਪਲ ਯਾਨੀ' },
        { heading: '', body: '**“ਗੋਦ ਭਰਾਈ”**\n[[1-flourish]]' },
        { heading: '', body: 'ਬੜੀ ਖੁਸ਼ੀ ਨਾਲ ਸੂਚਿਤ ਕਰਦੇ ਹਾਂ ਕਿ ਸਾਡੇ ਕੁਲਦੇਵ\nਸ਼੍ਰੀ ਸ਼੍ਰੀਨਾਥਜੀ ਬਾਵਾ ਅਤੇ ਉਮੀਆ ਮਾਤਾਜੀ ਦੀ\nਅਪਾਰ ਕਿਰਪਾ ਨਾਲ ਸ਼੍ਰੀਮਤੀ ਅਲਪਾਬੇਨ ਅਤੇ ਸ਼੍ਰੀ ਸ਼ੈਲੇਸ਼ਭਾਈ\nਜੀਵਨਭਾਈ ਵਾਛਾਣੀ ਦੇ ਸਪੁੱਤਰ' },
        { heading: '', body: '***ਚਿ. ਆਰਜ਼ੂ ਦੀ ਧਰਮਪਤਨੀ***' },
        { heading: '', body: '***ਸ਼੍ਰੀਮਤੀ ਰੋਸ਼ਨੀ***' },
      ],
    },
    {
      title: 'ਸੱਦਾ ਦੇਣ ਵਾਲੇ',
      sections: [
        { heading: '', body: '**ਪ੍ਰੀਤੀ ਭੋਜ**\n[[1-flourish]]\nਮਿਤੀ 04-05-2025, ਐਤਵਾਰ,\nਸ਼ਾਮ 6:30 ਵਜੇ\nਆਪ ਪਧਾਰਨਾ ਜੀ।' },
        { heading: '', body: '**ਸ਼ੁਭ ਸਥਾਨ**\n[[1-flourish]]\nਸਾਡੇ ਨਿਵਾਸ ਸਥਾਨ ਤੇ,\nD - 404, ਵੇਦਾਂਤ ਐਲੀਗੈਂਸ,\nਮੋਟਾ ਵਰਾਛਾ, ਤਲਾਅ ਨੇੜੇ, ਸੂਰਤ।' },
        { heading: '', body: '**ਸੱਦਾ ਦੇਣ ਵਾਲੇ**\n[[1-flourish]]\nਸ਼੍ਰੀ ਸ਼ੈਲੇਸ਼ਭਾਈ ਜੀਵਨਭਾਈ ਵਾਛਾਣੀ\nਸ਼੍ਰੀਮਤੀ ਅਲਪਾਬੇਨ ਸ਼ੈਲੇਸ਼ਭਾਈ ਵਾਛਾਣੀ\nਕੁਮਾਰੀ ਖੁਸ਼ੀ ਸ਼ੈਲੇਸ਼ਭਾਈ ਵਾਛਾਣੀ\n(98765 43210)' },
      ],
    },
  ],
  ta: [
    {
      title: 'அழைப்பிதழ்',
      sections: [
        { heading: '', body: '॥ ஸ்ரீ கணேசாய நமஃ ॥\n॥ ஸ்ரீநாத்ஜி பாவா ॥ <> ॥ ஸ்ரீ உமியா மா ॥' },
        { heading: '', body: '[[1-title|**அழைப்பிதழ்**]]' },
        { heading: '', body: 'இல்லற வாழ்வின் அழகான, வளமான தருணம் என்பது...' },
        { heading: '', body: '**“தாய்மை”**' },
        { heading: '', body: 'முதல் தாய்மை பெறும் பெருமைமிகு சுப தருணம் என்பது' },
        { heading: '', body: '**“வளைகாப்பு”**\n[[1-flourish]]' },
        { heading: '', body: 'எங்கள் குலதெய்வம் ஸ்ரீ ஸ்ரீநாத்ஜி பாவா\nமற்றும் உமியா மாதாஜியின் எல்லையற்ற அருளால்,\nதிருமதி அல்பாபென் - திரு ஷைலேஷ்பாய்\nஜீவன்பாய் வாச்சாணியின் மகன்' },
        { heading: '', body: '***சி. ஆர்சூவின் துணைவி***' },
        { heading: '', body: '***திருமதி ரோஷ்னி***' },
      ],
    },
    {
      title: 'அழைப்பவர்கள்',
      sections: [
        { heading: '', body: '**விருந்து**\n[[1-flourish]]\n04-05-2025, ஞாயிற்றுக்கிழமை,\nமாலை 6:30 மணி\nவருகை தாருங்கள்.' },
        { heading: '', body: '**சுப இடம்**\n[[1-flourish]]\nஎங்கள் இல்லத்தில்,\nD - 404, வேதாந்த் எலிகன்ஸ்,\nமோட்டா வராச்சா, ஏரி அருகில், சூரத்.' },
        { heading: '', body: '**அழைப்பவர்கள்**\n[[1-flourish]]\nதிரு ஷைலேஷ்பாய் ஜீவன்பாய் வாச்சாணி\nதிருமதி அல்பாபென் ஷைலேஷ்பாய் வாச்சாணி\nசெல்வி குஷி ஷைலேஷ்பாய் வாச்சாணி\n(98765 43210)' },
      ],
    },
  ],
}
export default tr
