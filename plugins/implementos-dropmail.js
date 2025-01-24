import fetch from "node-fetch";

let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
    conn.secmail = conn.secmail ? conn.secmail : {};
    let id = "secmail";

    let lister = ["صنع", "رسائل", "محو", "عرض"];
    const pp = 'https://telegra.ph/file/0dfb21b5b6e8dcbe96fc4.jpg';
    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ");

    if (!lister.includes(feature)) {
        return conn.sendButton(
            m.chat,
            `◉─━════════════━─◉
> *مرحبًا، أنا خدمة \`Fake Email Ai\`، خدمة قادرة على صنع الايميلات الوهمية .*
> *يمكنك استخدام الأزرار أدناه للتحكم في الخدمة:*
1. *صنع*: لإنشاء بريد إلكتروني وهمي جديد.
2. *رسائل*: لعرض الرسائل الواردة إلى البريد الإلكتروني الوهمي.
3. *محو*: لحذف جميع رسائل البريد الإلكتروني الوهمية.
4. *عرض*: لعرض تفاصيل البريد الإلكتروني الوهمي.
> *اختر العملية المطلوبة باستخدام الأزرار أدناه.*
◉─━════════════━─◉`,
            'By: BOT AL SOLTAN',
            pp,
            [
                ['صـنـع', `${usedPrefix + command} صنع`],
                ['رسـائـل', `${usedPrefix + command} رسائل`],
                ['مـحـو', `${usedPrefix + command} محو`],
                ['عــرض', `${usedPrefix + command} عرض`],
            ],
            m
        );
    }

    if (lister.includes(feature)) {
        if (feature == "صنع") {
            try {
                let eml = await random_mail();
                let info = eml[0].split('@');
                let id = "secmail_" + (Object.keys(conn.secmail).length + 1);
                let mess = "╭───────────────╮\n" + "*EMAIL:*\n" + eml[0] + "\n\n" + "*Login:*\n" + info[0] + "\n\n*Domain:*\n" + info[1] + "\n\nاضغط علي رسائل للتحقق من الرسائل\n" + "╰───────────────╯\n";
                conn.secmail[id] = [
                    eml[0],
                    info[0],
                    info[1]
                ];
                return conn.sendButton(
                    m.chat,
                    mess,
                    'By: BOT AL SOLTAN',
                    pp,
                    [
                        ['الـرئـيـسـيه', `${usedPrefix + command}`],
                        ['رسـائـل', `${usedPrefix + command} رسائل`],
                        ['مـحـو', `${usedPrefix + command} محو`],
                        ['عــرض', `${usedPrefix + command} عرض`],
                    ],
                    m
                );
            } catch (e) {
                await m.reply('حدث خطأ أثناء إنشاء البريد الإلكتروني.');
            }
        }

        if (feature == "رسائل") {
            if (!Object.keys(conn.secmail).length) return m.reply("لا توجد رسائل ، قم بإنشاء بريد إلكتروني أولاً\n من خلال كتابة \n*" + usedPrefix + command + " صنع*");

            try {
                for (let key in conn.secmail) {
                    let eml = await get_mails(conn.secmail[key][1], conn.secmail[key][2]);
                    let teks = eml.map((v, index) => {
                        return `*EMAIL [ ${index + 1} ]*
*ID* : ${v.id}
*من* : ${v.from}

*الموضوع* : ${v.subject}
*التاريخ* : ${v.date}
   `.trim();
                    }).filter(v => v).join("\n\n________________________\n\n");
                    await conn.sendButton(
                        m.chat,
                        teks || "*فارغ*",
                        'By: BOT AL SOLTAN',
                        pp,
                        [
                            ['الـرئـيـسـيه', `${usedPrefix + command}`],
                            ['صـنـع', `${usedPrefix + command} صنع`],
                            ['مـحـو', `${usedPrefix + command} محو`],
                            ['عــرض', `${usedPrefix + command} عرض`],
                        ],
                        m
                    );
                }
            } catch (e) {
                await m.reply('حدث خطأ أثناء جلب الرسائل.');
            }
        }

        if (feature == "محو") {
            if (!Object.keys(conn.secmail).length) return m.reply("لا توجد رسائل بريد إلكتروني لحذفها.");

            try {
                conn.secmail = {};
                return conn.sendButton(
                    m.chat,
                    "تم حذف جميع رسائل البريد الإلكتروني بنجاح.",
                    'By: BOT AL SOLTAN',
                    pp,
                    [
                        ['الـرئـيـسـيه', `${usedPrefix + command}`],
                        ['صـنـع', `${usedPrefix + command} صنع`],
                        ['رسـائـل', `${usedPrefix + command} رسائل`],
                        ['عــرض', `${usedPrefix + command} عرض`],
                    ],
                    m
                );
            } catch (e) {
                await m.reply('حدث خطأ أثناء حذف رسائل البريد الإلكتروني.');
            }
        }

        if (feature == "عرض") {
            if (!Object.keys(conn.secmail).length) return m.reply("لا توجد رسائل بريد إلكتروني لإنشاء بريد إلكتروني أولاً\nمن خلال كتابة \n*" + usedPrefix + command + " صنع*");

            try {
                let emailDetails = Object.keys(conn.secmail).map((key, index) => {
                    return `*EMAIL [ ${index + 1} ]*
*EMAIL:* ${conn.secmail[key][0]}
*Login:* ${conn.secmail[key][1]}
*Domain:* ${conn.secmail[key][2]}
   `.trim();
                }).join("\n\n________________________\n\n");
                return conn.sendButton(
                    m.chat,
                    emailDetails,
                    'By: BOT AL SOLTAN',
                    pp,
                    [
                        ['الـرئـيـسـيه', `${usedPrefix + command}`],
                        ['صـنـع', `${usedPrefix + command} صنع`],
                        ['رسـائـل', `${usedPrefix + command} رسائل`],
                        ['مـحـو', `${usedPrefix + command} محو`],
                    ],
                    m
                );
            } catch (e) {
                await m.reply('حدث خطأ أثناء عرض تفاصيل البريد الإلكتروني.');
            }
        }
    }
}

handler.help = ["secmail"];
handler.tags = ["misc"];
handler.command = /^(fakeemail|ايميل|بريد)$/i;
export default handler;

function msToTime(duration) {
    const milliseconds = parseInt((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
}

function formatSize(sizeInBytes) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let index = 0;

    while (sizeInBytes >= 1024 && index < units.length - 1) {
        sizeInBytes /= 1024;
        index++;
    }

    return sizeInBytes.toFixed(2) + " " + units[index];
}

async function random_mail() {
    const link = "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";

    try {
        let response = await fetch(link);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function get_mails(id, domain) {
    const link = `https://www.1secmail.com/api/v1/?action=getMessages&login=${id}&domain=${domain}`;

    try {
        let response = await fetch(link);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
console.log(error);
    }
                      }
