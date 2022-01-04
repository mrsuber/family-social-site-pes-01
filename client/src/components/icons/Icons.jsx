import React from 'react'
import './Icons.css'


const Icons = ({setContent, content}) => {
  const reactions =  [
    '😀','😃','😄','😁','😆','😅','😂','🙂','🙃','😉','😊','😇','😍','😘','😗','😚','😙','😋','😛','😜','😝','🤑',
'🤗','🤔','🤐','😐','😑','😶','😏','😒','🙄','😬','😌','😔','😪','😴','😷','🤒','🤕','😵','😎','🤓','😕','😟',
'🙁','😮','😯','😲','😳','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','😤','😡','😠',
'😈','👿','💀','☠','💩','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉',
'🙊','💋','💌','💘','💝','💖','💗','💓','💞','💕','💟','💔','💛','💚','💙','💜','💯','💢','💥','💫','💦','💨',
'🕳','💣','💬','👁️‍🗨️','🗨','🗯','💭','💤','👋','🖐','✋','🖖','👌','🤘','👈','👉','👆','🖕','👇','👍','👎','✊',
'👊','👏','🙌','👐','🙏','💅','💪','👂','👃','👀','👁','👅','👄','👶','👦','👧','👱','👨','👩','👴','👵','🙍',
'🙎','🙅','🙆','💁','🙋','🙇','👮','🕵','💂','👷','👸','👳','👲','👰','👼','🎅','💆','💇','🚶','🏃','💃','🕴',
'👯','🏇','⛷','🏂','🏌','🏄','🚣','🏊','⛹','🏋','🚴','🚵','🛀','🛌','👭','👫','👬','💏','👩‍❤️‍💋‍👨','👨‍❤️‍💋‍👨','👩‍❤️‍💋‍👩','💑',
'👩‍❤️‍👨','👨‍❤️‍👨','👩‍❤️‍👩','👪','👨‍👩‍👦','👨‍👩‍👧','👨‍👩‍👧‍👦','👨‍👩‍👦‍👦','👨‍👩‍👧‍👧','👨‍👨‍👦','👨‍👨‍👧','👨‍👨‍👧‍👦','👨‍👨‍👦‍👦','👨‍👨‍👧‍👧','👩‍👩‍👦','👩‍👩‍👧','👩‍👩‍👧‍👦','👩‍👩‍👦‍👦','👩‍👩‍👧‍👧','👨‍👦','👨‍👦‍👦',
'👨‍👧','👨‍👧‍👦','👨‍👧‍👧','👩‍👦','👩‍👦‍👦','👩‍👧','👩‍👧‍👦','👩‍👧‍👧','🗣','👤','👥','👣','🐵','🐒','🐶','🐕','🐩',
'🐺','🐱','🐈','🦁','🐯','🐅','🐆','🐴','🐎','🦄','🐮','🐂','🐃','🐄','🐷','🐖','🐗','🐽','🐏','🐑','🐐','🐪',
'🐫','🐘','🐭','🐁','🐀','🐹','🐰','🐇','🐿','🐻','🐨','🐼','🐾','🦃','🐔','🐓','🐣','🐤','🐥','🐦','🐧','🕊',
'🐸','🐊','🐢','🐍','🐲','🐉','🐳','🐋','🐬','🐟','🐠','🐡','🐙','🐚','🐌','🐛','🐜','🐝','🐞','🕷','🕸','🦂',
'💐','🌸','💮','🏵','🌹','🌺','🌻','🌼','🌷','🌱','🌲','🌳','🌴','🌵','🌾','🌿','☘','🍀','🍁','🍂','🍃','🍇',
'🍈','🍉','🍊','🍋','🍌','🍍','🍎','🍏','🍐','🍑','🍒','🍓','🍅','🍆','🌽','🌶','🍄','🌰','🍞','🧀','🍖','🍗',
'🍔','🍟','🍕','🌭','🌮','🌯','🍳','🍲','🍿','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🍡',
'🦀','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🍫','🍬','🍭','🍮','🍯','🍼','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻',
'🍽','🍴','🔪','🏺','🌍','🌎','🌏','🌐','🗺','🗾','🏔','⛰','🌋','🗻','🏕','🏖','🏜','🏝','🏞','🏟','🏛','🏗',
'🏘','🏚','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌',
'🕍','⛩','🕋','⛲','⛺','🌁','🌃','🏙','🌄','🌅','🌆','🌇','🌉','🎠','🎡','🎢','💈','🎪','🚂','🚃','🚄','🚅',
'🚆','🚇','🚈','🚉','🚊','🚝','🚞','🚋','🚌','🚍','🚎','🚐','🚑','🚒','🚓','🚔','🚕','🚖','🚗','🚘','🚙','🚚',
'🚛','🚜','🏎','🏍','🚲','🚏','🛣','🛤','🛢','⛽','🚨','🚥','🚦','🚧','⚓','⛵','🚤','🛳','⛴','🛥','🚢','🛩',
'🛫','🛬','💺','🚁','🚟','🚠','🚡','🛰','🚀','🛎','⌛','⏳','⌚','⏰','⏱','⏲','🕰','🕛','🕧','🕐','🕜','🕑',
'🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕡','🕖','🕢','🕗','🕣','🕘','🕤','🕙','🕥','🕚','🕦','🌑','🌒','🌓',
'🌔','🌕','🌖','🌗','🌘','🌙','🌚','🌛','🌜','🌡','🌝','🌞','⭐','🌟','🌠','🌌','⛅','⛈','🌤','🌥','🌦','🌧',
'🌨','🌩','🌪','🌫','🌬','🌀','🌈','🌂','⛱','⛄','☄','🔥','💧','🌊','🎃','🎄','🎆','🎇','✨','🎈','🎉','🎊',
'🎋','🎍','🎎','🎏','🎐','🎑','🎀','🎁','🎗','🎟','🎫','🎖','🏆','🏅','⚽','🏀','🏐','🏈','🏉','🎾','🎳','🏏',
'🏑','🏒','🏓','🏸','⛳','⛸','🎣','🎽','🎿','🎯','🎱','🔮','🎮','🕹','🎰','🎲','🃏','🀄','🎴','🎭','🖼','🎨',
'👓','🕶','👔','👕','👖','👗','👘','👙','👚','👛','👜','👝','🛍','🎒','👞','👟','👠','👡','👢','👑','👒','🎩',
'🎓','⛑','📿','💄','💍','💎','🔇','🔈','🔉','🔊','📢','📣','📯','🔔','🔕','🎼','🎵','🎶','🎙','🎚','🎛','🎤',
'🎧','📻','🎷','🎸','🎹','🎺','🎻','📱','📲','📞','📟','📠','🔋','🔌','💻','🖥','🖨','⌨','🖱','🖲','💽','💾',
'💿','📀','🎥','🎞','📽','🎬','📺','📷','📸','📹','📼','🔍','🔎','🕯','💡','🔦','🏮','📔','📕','📖','📗','📘',
'📙','📚','📓','📒','📃','📜','📄','📰','🗞','📑','🔖','🏷','💰','💴','💵','💶','💷','💸','💳','💹','💱','💲',
'📧','📨','📩','📤','📥','📦','📫','📪','📬','📭','📮','🗳','🖋','🖊','🖌','🖍','📝','💼','📁','📂','🗂','📅',
'📆','🗒','🗓','📇','📈','📉','📊','📋','📌','📍','📎','🖇','📏','📐','🗃','🗄','🗑','🔒','🔓','🔏','🔐','🔑',
'🗝','🔨','⛏','⚒','🛠','🗡','⚔','🔫','🏹','🛡','🔧','🔩','⚙','🗜','⚖','🔗','⛓','⚗','🔬','🔭','📡','💉','💊',
'🚪','🛏','🛋','🚽','🚿','🛁','🚬','⚰','⚱','🗿','🏧','🚮','🚰','♿','🚹','🚺','🚻','🚼','🚾','🛂','🛃','🛄','🛅',
'🚸','⛔','🚫','🚳','🚭','🚯','🚱','🚷','📵','🔞','☢','☣','↗','➡','↘','↙','↖','↕','↔','↩','↪','🔃','🔄','🔙',
'🔚','🔛','🔜','🔝','🛐','⚛','🕉','✡','☸','☯','✝','☦','☪','☮','🕎','🔯','♈','♉','♊','♋','♌','♍','♎','♏','♐',
'♑','♒','♓','⛎','🔀','🔁','🔂','▶','⏩','⏭','⏯','◀','⏪','⏮','🔼','⏫','🔽','⏬','⏸','⏹','⏺','⏏','🎦',
'🔅','🔆','📶','📳','📴','♀','♂','⚕','♾','♻','⚜','🔱','📛','🔰','⭕','✅','☑','✔','✖','❌','❎','➕','➖','➗',
'➰','➿','〽','✳','✴','❇','‼','⁉','❓','❔','❕','❗','〰','©','®','™','#️⃣','*️⃣','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣',
'6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔠','🔡','🔢','🔣','🔤','🅰','🆎','🅱','🆑','🆒','🆓','ℹ','🆔','Ⓜ','🆕','🆖','🅾',
'🆗','🅿','🆘','🆙','🆚','🈁','🈂','🈷','🈶','🈯','🉐','🈹','🈚','🈲','🉑','🈸','🈴','🈳','㊗','㊙','🈺','🈵','🔴',
'🔵','⚫','⚪','⬛','⬜','◼','◻','◾','◽','▪','▫','🔶','🔷','🔸','🔹','🔺','🔻','💠','🔘','🔳','🔲','🏁','🚩',
'🎌','🏴','🏳','🇦🇨','🇦🇩','🇦🇪','🇦🇫','🇦🇬','🇦🇮','🇦🇱','🇦🇲','🇦🇴','🇦🇶','🇦🇷','🇦🇸','🇦🇹','🇦🇺','🇦🇼','🇦🇽','🇦🇿','🇧🇦','🇧🇩',
'🇧🇪','🇧🇫','🇧🇬','🇧🇭','🇧🇮','🇧🇯','🇧🇱','🇧🇲','🇧🇳','🇧🇴','🇧🇶','🇧🇷','🇧🇸','🇧🇹','🇧🇻','🇧🇼','🇧🇾','🇧🇿','🇨🇦','🇨🇩','🇨🇫','🇨🇬',
'🇨🇭','🇨🇮','🇨🇰','🇨🇱','🇨🇲','🇨🇳','🇨🇴','🇨🇵','🇨🇷','🇨🇺','🇨🇻','🇨🇼','🇨🇽','🇨🇾','🇨🇿','🇩🇪','🇩🇬','🇩🇯','🇩🇰','🇩🇲','🇩🇴','🇩🇿',
'🇪🇦','🇪🇪','🇪🇬','🇪🇭','🇪🇷','🇪🇸','🇪🇹','🇪🇺','🇫🇮','🇫🇯','🇫🇰','🇫🇲','🇫🇴','🇫🇷','🇬🇦','🇬🇧','🇬🇩','🇬🇪','🇬🇫','🇬🇭','🇬🇮','🇬🇱',
'🇮🇴','🇮🇶','🇮🇷','🇮🇸','🇮🇹','🇯🇪','🇯🇲','🇯🇴','🇯🇵','🇰🇪','🇰🇬','🇰🇭','🇰🇮','🇰🇲','🇰🇳','🇰🇵','🇰🇷','🇰🇼','🇰🇾','🇰🇿','🇱🇦','🇱🇧',
'🇱🇨','🇱🇮','🇱🇰','🇱🇷','🇱🇸','🇱🇹','🇱🇺','🇱🇻','🇱🇾','🇲🇦','🇲🇨','🇲🇩','🇲🇪','🇲🇫','🇲🇬','🇲🇭','🇲🇰','🇲🇱','🇲🇳','🇲🇴','🇲🇵','🇲🇶',
'🇲🇷','🇲🇸','🇲🇹','🇲🇺','🇲🇻','🇲🇼','🇲🇽','🇲🇾','🇲🇿','🇳🇦','🇳🇨','🇳🇪','🇳🇫','🇳🇬','🇳🇮','🇳🇱','🇳🇴','🇳🇵','🇳🇷','🇳🇺','🇳🇿','🇴🇲',
'🇵🇦','🇵🇪','🇵🇫','🇵🇬','🇵🇭','🇵🇰','🇵🇱','🇵🇲','🇵🇳','🇵🇷','🇵🇸','🇵🇹','🇵🇼','🇵🇾','🇶🇦','🇷🇪','🇷🇴','🇷🇸','🇷🇺','🇷🇼','🇸🇦','🇸🇧',
'🇸🇨','🇸🇩','🇸🇪','🇸🇬','🇸🇭','🇸🇮','🇸🇯','🇸🇰','🇸🇱','🇸🇲','🇸🇳','🇸🇴','🇸🇷','🇸','🇸🇹','🇸🇻','🇸🇽','🇸🇾','🇸🇿','🇹🇦','🇹🇨','🇹🇩',
'🇹🇫','🇹🇬','🇹🇭','🇹🇯','🇹🇰','🇹🇱','🇹🇲','🇹🇳','🇹🇴','🇹🇷','🇹🇻','🇹🇼','🇹🇿','🇺🇦','🇺🇬','🇺🇲','🇺🇸','🇺🇾','🇺🇿','🇻🇦','🇻🇨','🇻🇪',
'🇻🇬','🇻🇮','🇻🇳','🇻🇺','🇼🇫','🇼🇸','🇽🇰','🇾🇪','🇾🇹','🇿🇦','🇿🇲','🇿🇼'
                      ]

  return (

    <div className="nav-item dropdown">
      <span className="nav-link social2__adjust_avatar" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span style={{opacity:0.4}}>😀</span>
      </span>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <div className="social2__reactions">
          {
            reactions.map(icon =>(
              <span key={icon} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))
          }
        </div>
      </div>
    </div>

  )
}

export default Icons
