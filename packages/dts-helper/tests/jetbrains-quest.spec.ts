test('JetBrainsQuest S1E1', () => {
  // JetBrains Quest begins… #JetBrainsQuest
  // 48 61 76 65 20 79 6f 75 20 73 65 65 6e 20 74 68 65 20 73 6f 75 72 63 65 20 63 6f 64 65 20 6f 66 20 74 68 65 20 4a 65 74 42 72 61 69 6e 73 20 77 65 62 73 69 74 65 3f

  // https://jb.gg/574

  // https://youtrack.jetbrains.com/issue/MPS-31816

  const result = 'Qlfh$#Li#|rx#duh#uhdglqj#wklv#|rx#pxvw#kdyh#zrunhg#rxw#krz#wr#ghfu|sw#lw1#Wklv#lv#rxu#lvvxh#wudfnhu#ghvljqhg#iru#djloh#whdpv1#Lw#lv#iuhh#iru#xs#wr#6#xvhuv#lq#Forxg#dqg#iru#43#xvhuv#lq#Vwdqgdorqh/#vr#li#|rx#zdqw#wr#jlyh#lw#d#jr#lq#|rxu#whdp#wkhq#zh#wrwdoo|#uhfrpphqg#lw1#|rx#kdyh#ilqlvkhg#wkh#iluvw#Txhvw/#qrz#lw“v#wlph#wr#uhghhp#|rxu#iluvw#sul}h1#Wkh#frgh#iru#wkh#iluvw#txhvw#lv#‟EhfdxvhFrgh†1#Jr#wr#wkh#Txhvw#Sdjh#dqg#xvh#wkh#frgh#wr#fodlp#|rxu#sul}h1#kwwsv=22zzz1mhweudlqv1frp2surpr2txhvw2'
    .split('')
    .map(c => String.fromCharCode(c.charCodeAt() - 3))
    .join('');
  const a = 'Q'.charCodeAt();
  console.log(result);
  const r = result.match(/(".*")|(“.*”)/g)[0].replace(/"|“|”/g, '');
  console.log('code =>', r);
  //
});

test('JetBrainsQuest S1E2', () => {
  // Time for the next #JetBrainsQuest!
  // .spleh A+lrtC/dmC .thgis fo tuo si ti semitemos ,etihw si txet nehw sa drah kooL .tseretni wohs dluohs uoy ecalp a si ,dessecorp si xat hctuD erehw esac ehT .sedih tseuq fo txen eht erehw si ,deificeps era segaugnal cificeps-niamod tcudorp ehT

  const question =
    '.spleh A+lrtC/dmC .thgis fo tuo si ti semitemos ,etihw si txet nehw sa drah kooL .tseretni wohs dluohs uoy ecalp a si ,dessecorp si xat hctuD erehw esac ehT .sedih tseuq fo txen eht erehw si ,deificeps era segaugnal cificeps-niamod tcudorp ehT';
  const result = question
    .split('')
    .reverse()
    .join('');
  console.log(result);

  // The product domain-specific languages are specified, is where the next of quest hides.
  // The case where Dutch tax is processed, is a place you should show interest.
  // Look hard as when text is white, sometimes it is out of sight. Cmd/Ctrl+A helps.

  // This is our 20th year as a company,
  // we have shared numbers in our JetBrains
  // Annual report, sharing the section with
  // 18,650 numbers will progress your q

  // I have found the JetBrains Quest! Sometimes you just need to look closely at the Haskell language, Hello,World!
  // in the hackathon lego brainstorms project https://blog.jetbrains.com/blog/2019/11/22/jetbrains-7th-annual-hackathon/
  // #JetBrainsQuest https://www.jetbrains.com/company/annualreport/2019/ via @JetBrains

  // 谷歌浏览器无痕模式进入 https://www.jetbrains.com/gamedev/ ↑↑↓↓←→←→BA
});

test('JetBrainsQuest S1E3', () => {
  // SGF2ZSB5b3Ugc2VlbiB0aGUgcG9zdCBvbiBvdXIgSW5zdGFncmFtIGFjY291bnQ/
  // Have you seen the post on our Instagram account?

  // https://www.instagram.com/p/B9q-CnhoUVl/
  // Welcome to the final Quest! You should start on the Kotlin Playground: https://jb.gg/kotlin_quest

  let s =
    'Zh#kdyh#ehhq#zrunlqj#552:#rq#wkh#ylghr#iru#wkh#iluvw#hslvrgh#ri#wkh#SksVwrup#HDS1#Li#zh#jdyh#|rx#d#foxh/#lw#zrxog#eh#hdv|#dv#sl1';

  // s = 'SSBhbSBnaXZpbmcgYXdheSB0aGlzIDIwJSBBbGwgUHJvZHVjdHMgUGFjayBzdWJzY3JpcHRpb24gZGlzY291bnQgY29kZSB0byB0aGUgZmlyc3QgbHVja3kgcGVyc29uOiBBTEJQQi1URFFFNy1FTEpXQS1HRTlGTi1UTkNBWAo='

  const s1 = s.split('');

  for (let i = 0; i < 26; i++) {
    if (i < 4) {
      continue;
    }
    if (i > 4) {
      break;
    }
    const result = s1.map(c => String.fromCharCode(c.charCodeAt() - i + 1)).join('');
    console.log(`RESULT ${i} = > `, `${result}\n`);
  }

  // We have been working 22/7 on the video for the first episode of the PhpStorm EAP.
  // If we gave you a clue, it would be easy as pi.

  // https://jb.gg/31415926
  // 相关问题答案在这可以了解到 https://www.jetbrains.com/zh-cn/company/annualreport/2019/

  // How many people founded JetBrains? 3
  // When was the first version of IntelliJ IDEA released? 2001
  // Where is JetBrains headquarters? 捷克的布拉格(Prague, Czech Republic)
  // How many employees does JetBrains have? 1200
  // How many developers use our products? 800
  // What year was Kotlin introduced for the first time? 2011
  // What is the name of the newest JetBrains product? Space
  // From the Forbes Top 100 digital companies, how many use our products? 95
  // Which country had the highest growing rate of downloads for 2019? 布基纳法索
  // How much external funding have JetBrains received? 0

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Almost there! The last challenge is in the Tips of the Day of a specific IntelliJ IDEA Community
  // version from our latest build page in Confluence, but… there is a catch. You have to know
  // which version to look for. To find the build number, you need sight beyond sight:

  // . Not Everything Today Does All You Could Ask. Lessons Learned From Other Relevant Solutions,
  // Possibly Even Another Kind Emerge. Risking Sometimes Being Liberal Or Generous Proves
  // Ordinary Simple Tests Infinitely More Annoying. Get Examining Hidden Initial Designated Early
  // Symbols. They Have Everything Needed, Except Xerox, To Completely Level Up Everything.

  // you_are_looking_for_build_201-6303.png

  // 46023125
});
