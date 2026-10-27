(function fitnoteRecipeAddon(){
'use strict';
if(window.__fitnoteRecipeAddon)return;window.__fitnoteRecipeAddon=true;
const src=[
['卵・納豆の和朝食',12,'白米（炊いたもの）150g|卵1個|納豆1パック（45g）|味噌汁1杯|刻みねぎ少々','温かいご飯を茶碗に盛る。|納豆に付属のたれと刻みねぎを混ぜる。|卵は目玉焼きまたはゆで卵にする。|味噌汁と一緒に盛り付ける。'],
['鮭とご飯の朝食',15,'鮭の切り身80g|白米（炊いたもの）150g|豆腐50g|味噌小さじ1|ねぎ少々','鮭に軽く塩を振り、グリルまたはフライパンで中まで焼く。|鍋に水180mlと豆腐を入れて温め、火を止めて味噌を溶く。|ご飯と焼き鮭、味噌汁を盛り付ける。'],
['卵かけご飯と豆腐',8,'白米（炊いたもの）180g|生食用の卵1個|木綿豆腐100g|しょうゆ小さじ2|刻みのり少々','ご飯を温めて茶碗に盛る。|生食用の卵をご飯に割り入れ、しょうゆを少量かける。|豆腐を皿に盛り、残りのしょうゆとのりを添える。'],
['鶏むねおにぎりセット',15,'白米（炊いたもの）200g|サラダチキン110g|のり2枚|梅干し1個|塩少々','ご飯を2等分し、梅干しを具にして握ってのりを巻く。|サラダチキンを食べやすい大きさに切る。|おにぎりとチキンを一緒に詰める。'],
['オートミール・バナナ',8,'オートミール50g|牛乳150ml|バナナ1本（100g）|シナモン少々','耐熱容器にオートミールと牛乳を入れる。|電子レンジ600Wで約2分加熱し、混ぜて好みの柔らかさにする。|バナナを切ってのせ、シナモンを振る。'],
['ギリシャヨーグルトボウル',5,'ギリシャヨーグルト200g|いちご60g|ブルーベリー40g|グラノーラ40g','器にヨーグルトを入れる。|洗ったベリーを食べやすく切る。|グラノーラとベリーをのせ、食べる直前に混ぜる。'],
['全粒パンとスクランブルエッグ',12,'全粒食パン2枚（120g）|卵2個|牛乳大さじ1|オリーブオイル小さじ1|ミニトマト4個','パンをトースターで焼く。|卵と牛乳を混ぜ、オイルを熱したフライパンで半熟程度に火を通す。|パンに卵を添え、洗ったミニトマトを盛る。'],
['ツナとアボカドのトースト',10,'全粒食パン2枚|ツナ水煮70g|アボカド1/2個（70g）|レモン汁小さじ1|塩・こしょう少々','パンをトーストする。|ツナの水気を切り、つぶしたアボカドとレモン汁を混ぜる。|塩・こしょうで味を調え、パンにのせる。'],
['卵とアボカド',10,'卵2個|アボカド1/2個（70g）|葉野菜50g|オリーブオイル小さじ1|塩・こしょう少々','卵をゆで卵または目玉焼きにする。|アボカドを切り、葉野菜を洗って水気を切る。|すべて盛り付け、オイルと塩・こしょうをかける。'],
['納豆豆腐ボウル',8,'木綿豆腐150g|納豆1パック（45g）|卵1個|小ねぎ少々|しょうゆ小さじ1','豆腐を軽く水切りして器に入れる。|卵はゆで卵など好みの方法で加熱する。|納豆を混ぜて豆腐にのせ、卵・ねぎ・しょうゆを添える。'],
['サラダチキンとゆで卵',12,'サラダチキン110g|卵2個|葉野菜80g|ミニトマト4個|ドレッシング小さじ2','卵を好みの固さにゆで、殻をむく。|葉野菜とトマトを洗って切る。|サラダチキンと卵を盛り付け、ドレッシングを添える。'],
['プロテインパンケーキ',15,'オートミール粉50g|卵1個|牛乳80ml|プロテインパウダー20g|バナナ1/2本','ボウルで材料を混ぜ、生地を作る。|薄く油を塗ったフライパンを弱火で熱し、生地を2〜3枚に分けて焼く。|両面に火を通し、薄切りのバナナを添える。'],
['鶏むね肉の定食',20,'鶏むね肉（皮なし）150g|白米（炊いたもの）200g|ブロッコリー100g|オリーブオイル小さじ2|しょうゆ小さじ2','鶏肉を食べやすく切り、しょうゆで下味をつける。|フライパンに油をひき、鶏肉の中までしっかり加熱する。|ブロッコリーをゆで、ご飯と一緒に盛る。'],
['焼き鮭定食',20,'鮭120g|白米（炊いたもの）200g|豆腐80g|味噌小さじ1|小松菜50g','鮭をグリルかフライパンで火が通るまで焼く。|小松菜をゆでて食べやすく切る。|豆腐入りの味噌汁を作り、ご飯と一緒に盛る。'],
['豚ヒレ生姜焼き定食',20,'豚ヒレ肉150g|白米（炊いたもの）180g|キャベツ80g|しょうゆ大さじ1|みりん小さじ2|おろし生姜小さじ1','豚肉を薄切りにし、しょうゆ・みりん・生姜を混ぜる。|フライパンで肉を両面焼き、中まで火を通す。|残りのたれを絡め、千切りキャベツとご飯を添える。'],
['サーモンとアボカド丼',15,'刺身用サーモン120g|アボカド1/2個（70g）|白米（炊いたもの）180g|しょうゆ小さじ2|のり少々','ご飯を器に盛り、粗熱を少し取る。|サーモンとアボカドを食べやすく切る。|ご飯の上に並べ、しょうゆとのりを添える。生魚は衛生的に扱う。'],
['親子丼',20,'鶏もも肉120g|卵2個|玉ねぎ1/4個|白米（炊いたもの）200g|めんつゆ大さじ2|水100ml','鶏肉を一口大に、玉ねぎを薄切りにする。|小鍋で水・めんつゆ・玉ねぎを煮てから鶏肉を加え、中まで火を通す。|溶き卵を回し入れて十分加熱し、ご飯にのせる。'],
['ツナとトマトのパスタ',20,'パスタ（乾麺）100g|ツナ水煮70g|トマト1個|にんにく1/2片|オリーブオイル大さじ1|塩少々','塩を加えた湯でパスタを表示時間どおりゆでる。|フライパンでオイル・にんにく・刻んだトマトを加熱する。|ツナとゆで汁少量を加え、パスタを絡める。'],
['チキンと玄米のプレート',20,'鶏むね肉150g|玄米ご飯180g|ブロッコリー100g|オリーブオイル小さじ2|塩・こしょう少々','鶏肉に塩・こしょうを振る。|油を熱したフライパンで鶏肉を中まで焼く。|ブロッコリーを蒸し、玄米ご飯と一緒に皿に盛る。'],
['ローストビーフ丼',15,'調理済みローストビーフ120g|白米（炊いたもの）180g|玉ねぎ1/4個|レタス40g|和風ソース大さじ1','玉ねぎを薄切りにし、辛みが気になる場合は軽く水にさらす。|器にご飯とレタスを盛る。|加熱済みのローストビーフをのせ、玉ねぎとソースを添える。'],
['そばとゆで卵',15,'そば（乾麺）90g|卵2個|めんつゆ適量|青ねぎ少々','卵を好みの固さにゆでる。|そばを表示時間どおりゆで、流水でしめるか温かいつゆに入れる。|半分に切ったゆで卵と青ねぎをのせる。'],
['チキンサラダボウル',20,'鶏むね肉150g|ミックスビーンズ50g|葉野菜100g|ミニトマト5個|オリーブオイル大さじ1','鶏肉を焼くかゆでて中まで加熱し、薄切りにする。|野菜を洗って食べやすく切る。|豆と鶏肉をのせ、オイル・塩・こしょうで味を整える。'],
['牛赤身と温野菜',20,'牛赤身肉180g|ブロッコリー100g|にんじん50g|木綿豆腐100g|オリーブオイル小さじ2','ブロッコリーとにんじんを蒸すかゆでる。|牛肉を食べやすく切り、油をひいたフライパンで十分に加熱する。|豆腐と温野菜を添え、好みで塩・こしょうを振る。'],
['鮭とブロッコリーのプレート',20,'鮭150g|ブロッコリー150g|オリーブオイル大さじ1|レモン1/4個|塩・こしょう少々','鮭に塩・こしょうを振り、フライパンで中まで焼く。|ブロッコリーをゆでる。|皿に盛り、オイルとレモンをかける。'],
['サラダチキン＋おにぎり',5,'サラダチキン110g|おにぎり2個|カット野菜80g','市販品を用意し、パッケージの栄養成分を確認する。|チキンを食べやすく切り、おにぎりと野菜を盛り合わせる。|ドレッシングを使う場合は別途栄養素を加える。'],
['豆腐ハンバーグ定食',25,'鶏ひき肉100g|木綿豆腐100g|玉ねぎ1/4個|白米（炊いたもの）180g|パン粉大さじ2|しょうゆ小さじ2','豆腐を水切りし、玉ねぎをみじん切りにする。|鶏ひき肉・豆腐・玉ねぎ・パン粉を混ぜて小判形にする。|フライパンで両面を焼き、中までしっかり火を通してご飯と盛る。'],
['焼き魚の和定食',20,'サバ切り身120g|白米（炊いたもの）150g|小松菜80g|豆腐50g|味噌小さじ1','サバをグリルで皮目をパリッと焼き、中まで火を通す。|小松菜をゆでて水気を絞る。|豆腐の味噌汁を作り、ご飯と一緒に盛る。'],
['鶏胸肉のグリル',25,'鶏むね肉（皮なし）200g|じゃがいも150g|ブロッコリー100g|オリーブオイル小さじ2','じゃがいもを小さく切り電子レンジで柔らかくする。|鶏肉に塩・こしょうを振り、油を熱したフライパンで中心まで火を通す。|ブロッコリーをゆで、じゃがいもと鶏肉を盛る。'],
['豚ヒレのソテー定食',20,'豚ヒレ肉180g|白米（炊いたもの）160g|きのこ80g|オリーブオイル小さじ2|しょうゆ小さじ2','豚ヒレを厚さ1cmほどに切り、塩・こしょうを振る。|フライパンに油を熱し、両面を焼いて中まで火を通す。|きのこを同じフライパンで炒め、しょうゆで味付けしご飯に添える。'],
['牛赤身のステーキプレート',25,'牛赤身ステーキ肉180g|白米（炊いたもの）120g|アスパラ80g|オリーブオイル小さじ2|塩・こしょう少々','牛肉に塩・こしょうを振る。|フライパンに油をひき、肉を好みの焼き加減まで加熱する。|アスパラを炒め、ご飯と一緒に盛り付ける。'],
['タラと野菜の蒸し料理',20,'タラ200g|白米（炊いたもの）180g|キャベツ80g|にんじん40g|ポン酢大さじ1','野菜を薄切りにして耐熱皿に敷く。|タラをのせてふんわりラップし、電子レンジまたは蒸し器で中心まで加熱する。|ポン酢をかけ、ご飯と一緒に食べる。'],
['鶏そぼろ丼',20,'鶏ひき肉120g|卵1個|白米（炊いたもの）180g|しょうゆ大さじ1|みりん小さじ2|おろし生姜少々','鶏ひき肉をフライパンに入れて炒め、しょうゆ・みりん・生姜を加える。|卵を溶いて別のフライパンで炒り卵にする。|ご飯にそぼろと炒り卵を半分ずつのせる。'],
['豆腐チャンプルー定食',20,'木綿豆腐150g|豚肉80g|キャベツ100g|もやし80g|白米（炊いたもの）150g|しょうゆ小さじ2','豆腐を水切りし、豚肉と野菜を食べやすく切る。|豚肉を炒めて中まで火を通す。|豆腐と野菜を加え、しょうゆで味を調えてご飯と盛る。'],
['海鮮ちらし丼',15,'刺身用まぐろ60g|刺身用サーモン60g|卵1個|白米（炊いたもの）200g|すし酢大さじ1|きゅうり30g','温かいご飯にすし酢を混ぜて冷ます。|卵で薄焼き卵を作り、細く切る。|刺身ときゅうりを切って酢飯にのせる。生魚は衛生的に扱う。'],
['チキントマト煮込み',30,'鶏もも肉150g|カットトマト150g|玉ねぎ1/4個|ミックスビーンズ50g|白米（炊いたもの）100g|オリーブオイル小さじ2','玉ねぎと鶏肉を一口大に切る。|フライパンに油を熱し鶏肉と玉ねぎを炒める。|トマトと豆を加え約10分煮込み、鶏肉の中まで火を通してご飯と盛る。'],
['鶏肉ときのこの鍋',25,'鶏むね肉150g|木綿豆腐150g|しめじ80g|白菜150g|だし汁300ml|ポン酢大さじ1','鶏肉と野菜を食べやすく切る。|鍋でだし汁を沸かし、鶏肉・白菜・きのこを入れる。|鶏肉に完全に火が通ったら豆腐を温め、ポン酢で食べる。'],
['サーモンのバターソテー',20,'サーモン150g|バター10g|ブロッコリー100g|葉野菜50g|レモン1/4個','サーモンの表面に塩・こしょうを振る。|フライパンにバターを溶かし、サーモンを両面焼いて中まで火を通す。|ゆでたブロッコリーと葉野菜、レモンを添える。'],
['牛肉とアボカドサラダ',20,'牛赤身肉150g|アボカド1/2個（70g）|葉野菜120g|オリーブオイル大さじ1|レモン汁小さじ1','牛肉をフライパンで十分に加熱して粗熱を取る。|アボカドを薄切りにし、葉野菜を洗って水気を切る。|肉と野菜を盛り、オイル・レモン汁をかける。'],
['鶏むねと豆腐のスープ',20,'鶏むね肉150g|絹豆腐150g|白菜100g|にんじん30g|鶏がらスープ300ml','鶏肉・白菜・にんじんを小さめに切る。|スープで鶏肉と野菜を煮て、中心まで火を通す。|最後に豆腐を加えて温め、塩・こしょうで味を調える。'],
['ブリ照り焼き定食',20,'ブリ切り身120g|白米（炊いたもの）160g|しょうゆ大さじ1|みりん大さじ1|小松菜60g|味噌汁1杯','フライパンでブリを焼き、中まで火を通す。|しょうゆ・みりんを加えて煮からめる。|小松菜をゆで、ご飯と味噌汁を添える。'],
['バナナと無脂肪ヨーグルト',3,'バナナ1本（100g）|無脂肪ヨーグルト150g','器にヨーグルトを入れる。|バナナの皮をむいて薄切りにし、ヨーグルトにのせる。'],
['プロテイン1杯',3,'プロテインパウダー30g|水200〜250ml','シェーカーに水を先に入れる。|プロテインパウダーを入れ、ダマがなくなるまでよく振る。|メーカーの表示に従って1杯分の量を調整する。'],
['ギリシャヨーグルトとベリー',3,'ギリシャヨーグルト150g|ブルーベリー50g|いちご50g','ヨーグルトを器に入れる。|洗って水気を切ったベリーをのせる。'],
['ゆで卵2個',12,'卵2個|水適量','鍋に卵がつかる程度の水を沸かす。|卵を静かに入れて好みの固さになるまで加熱する。|冷水で冷まして殻をむく。'],
['ナッツ25g',2,'無塩ミックスナッツ25g','キッチンスケールで25g量る。|保存容器や小袋に取り分ける。ナッツアレルギーがある場合は避ける。'],
['高タンパクバー',2,'市販のプロテインバー1本','商品を選び、パッケージの栄養成分を確認する。|1本分の表示値を目安として記録する。'],
['枝豆',10,'冷凍枝豆（さや付き）150g（可食部約100g）|塩少々','冷凍枝豆を表示どおりゆでるか電子レンジで温める。|水気を切り、好みで少量の塩を振る。'],
['りんごとカッテージチーズ',5,'りんご1/2個（100g）|カッテージチーズ80g|シナモン少々','りんごを洗って芯を取り、薄切りにする。|カッテージチーズと一緒に盛り、好みでシナモンを振る。'],
['ツナとチーズ',5,'ツナ水煮70g|プロセスチーズ25g|きゅうり40g','ツナの水気を切る。|チーズときゅうりを一口大に切る。|器に盛り合わせる。'],
['焼き芋と牛乳',5,'市販の焼き芋100g|牛乳100ml','焼き芋を好みで電子レンジで温める。|100gを目安に切り分け、牛乳を添える。'],
['冷ややっこ',5,'絹豆腐150g|刻みねぎ5g|おろし生姜少々|しょうゆ小さじ1','豆腐を冷蔵庫から出し、水を切って皿に盛る。|刻みねぎと生姜をのせる。|食べる直前にしょうゆをかける。'],
['バナナとアーモンド',3,'バナナ1本（100g）|無塩アーモンド15g','バナナの皮をむき、食べやすい大きさに切る。|アーモンド15gを計量し、添える。']
];
const RECIPES=Object.fromEntries(src.map(([n,time,ing,steps])=>[n,{time,ingredients:ing.split('|'),steps:steps.split('|')}]));
let activeRecipe=null,originFocus=null;
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function stepsFromCustom(text){return String(text||'').split(/\r?\n|(?=[①②③④⑤⑥⑦⑧])/).map(s=>s.trim()).filter(Boolean).map(s=>s.replace(/^[①②③④⑤⑥⑦⑧]\s*/,''));}
function createOverlay(item){
 const rec=RECIPES[item.name],custom=item.origin==='custom',ingredients=rec?.ingredients||String(item.detail||'').split(/[、,\n]+/).map(s=>s.trim()).filter(Boolean),steps=rec?.steps||stepsFromCustom(item.steps),duration=rec?.time;
 const macroKnown=[item.k,item.p,item.f,item.c].every(v=>v!=null&&Number.isFinite(Number(v)));
 const e=document.createElement('div');e.id='fitnoteRecipeModal';e.className='fitnote-recipe-shade';
 e.onclick=ev=>{if(ev.target===e)window.fitnoteCloseRecipe()};
 e.innerHTML=`<div class="fitnote-recipe-sheet" role="dialog" aria-modal="true" aria-labelledby="recipeDialogTitle" tabindex="-1">
 <div class="fitnote-recipe-handle"></div>
 <header class="fitnote-recipe-head"><div><div class="fitnote-recipe-overline">🍳 1人前のレシピ${duration?' · 約'+duration+'分':''}</div><h2 id="recipeDialogTitle">${safe(item.name)}</h2><div class="fitnote-recipe-muted">${safe(item.slot||'')} ｜ ${safe(item.emoji||'🍽️')} ${custom?'自分の献立':'提案献立'}</div></div>
 <button class="fitnote-recipe-close" onclick="fitnoteCloseRecipe()" aria-label="レシピを閉じる">×</button></header>
 <div class="fitnote-recipe-info">
 ${macroKnown?`<div class="fitnote-recipe-numbers">${[['k','kcal'],['p','P(g)'],['f','F(g)'],['c','C(g)']].map(([key,label])=>`<div><b>${safe(item[key])}</b><small>${label}</small></div>`).join('')}</div>`:'<p>栄養素はまだ登録されていません。</p>'}
 <div class="fitnote-recipe-warning">※ カロリー・PFCは料理候補の参考値で、下記の材料から精密計算した値ではありません。商品の種類、調理油、分量で変わります。</div></div>
 <section class="fitnote-recipe-section"><div class="fitnote-recipe-sectionhead"><h3>🛒 材料</h3><span>1人分</span></div>
 ${ingredients.length?`<div class="fitnote-recipe-ingredients">${ingredients.map(x=>`<label><input type="checkbox"><span>${safe(x)}</span></label>`).join('')}</div>`:'<div class="fitnote-recipe-muted">材料は未登録です。</div>'}
 </section>
 <section class="fitnote-recipe-section"><div class="fitnote-recipe-sectionhead"><h3>👩‍🍳 作り方</h3><span>${steps.length} ステップ</span></div>
 ${steps.length?`<ol class="fitnote-recipe-steps">${steps.map(x=>`<li>${safe(x)}</li>`).join('')}</ol>`:`<div class="fitnote-recipe-muted">作り方がまだ登録されていません。下のフォームから追加できます。</div>`}
 </section>
 ${custom?`<section class="fitnote-recipe-section">
 <h3>✏️ 自作レシピを編集</h3>
 <label class="fitnote-recipe-editlabel">材料・分量<textarea id="fitnoteCustomRecipeIngredients" rows="2" maxlength="600">${safe(item.detail||'')}</textarea></label>
 <label class="fitnote-recipe-editlabel">作り方（1行ずつ）<textarea id="fitnoteCustomRecipeSteps" rows="5" maxlength="1800" placeholder="1行ごとに手順を書く">${safe(item.steps||'')}</textarea></label>
 <button class="fitnote-recipe-save" onclick="fitnoteSaveCustomRecipeDetails()">材料・作り方を保存</button>
 </section>`:''}
 <div class="fitnote-recipe-footer"><button class="fitnote-recipe-copy" onclick="fitnoteCopyRecipe()">材料と作り方をコピー</button><button class="fitnote-recipe-done" onclick="fitnoteCloseRecipe()">献立に戻る</button></div>
 </div>`;
 return e;
}
window.fitnoteOpenRecipe=function(item){
 if(!item||typeof item!=='object')return;
 window.fitnoteCloseRecipe();
 activeRecipe=item;originFocus=document.activeElement;
 const modal=createOverlay(item);document.body.append(modal);modal.querySelector('.fitnote-recipe-sheet')?.focus({preventScroll:true});
 document.body.classList.add('fitnote-recipe-locked');
};
window.fitnoteCloseRecipe=function(){
 const root=document.getElementById('fitnoteRecipeModal');if(root)root.remove();
 document.body.classList.remove('fitnote-recipe-locked');
 if(originFocus&&originFocus.isConnected)originFocus.focus({preventScroll:true});
 activeRecipe=null;
};
function getText(item){
 const r=RECIPES[item.name],ingredients=r?.ingredients||String(item.detail||'').split(/[、,\n]+/).filter(Boolean),steps=r?.steps||stepsFromCustom(item.steps);
 return `${item.name}（1人前）\n${r?.time?'調理時間：約'+r.time+'分\n':''}\n【材料】\n${ingredients.map(x=>'・'+x).join('\n')}\n\n【作り方】\n${steps.map((x,i)=>(i+1)+'. '+x).join('\n')}\n\n※ 栄養値は料理候補の概算であり、材料からの精密計算値ではありません。`;
}
window.fitnoteCopyRecipe=async function(){
 if(!activeRecipe)return;const str=getText(activeRecipe);
 try{await navigator.clipboard.writeText(str);alert('レシピをコピーしました')}catch(e){window.prompt('レシピをコピーしてください',str)}
};
window.fitnoteSaveCustomRecipeDetails=function(){
 const item=activeRecipe;if(!item||item.origin!=='custom')return;
 const ingredients=document.getElementById('fitnoteCustomRecipeIngredients')?.value.trim().slice(0,600)||'',steps=document.getElementById('fitnoteCustomRecipeSteps')?.value.trim().slice(0,1800)||'';
 function apply(x){if(x.origin==='custom'&&String(x.id)===String(item.id)){x.detail=ingredients;x.steps=steps}}
 (state.recipeCustom||[]).forEach(apply);
 Object.values(state.recipePlans||{}).forEach(day=>(day.items||[]).forEach(apply));
 (state.recipeSaved||[]).forEach(apply);
 item.detail=ingredients;item.steps=steps;save();
 const focus=item;window.fitnoteCloseRecipe();render();window.fitnoteOpenRecipe(focus);
 notify('自作レシピを保存しました');
};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('fitnoteRecipeModal'))window.fitnoteCloseRecipe()});
const style=document.createElement('style');
style.textContent=`
body.fitnote-recipe-locked{overflow:hidden}
.fitnote-recipe-shade{position:fixed;inset:0;z-index:300;background:rgba(11,27,55,.61);display:flex;justify-content:center;align-items:flex-end}
.fitnote-recipe-sheet{width:min(100%,540px);height:min(90dvh,840px);overflow-y:auto;background:#fff;border-radius:23px 23px 0 0;box-shadow:0 -16px 38px rgba(16,36,74,.2);padding:0 18px max(26px,env(safe-area-inset-bottom));overscroll-behavior:contain;color:#17243d}
.fitnote-recipe-sheet:focus{outline:none}
.fitnote-recipe-handle{width:44px;height:5px;border-radius:99px;background:#d5deed;margin:10px auto 12px}
.fitnote-recipe-head{display:flex;align-items:start;justify-content:space-between;gap:10px;border-bottom:1px solid #e9eef6;padding:8px 0 17px}
.fitnote-recipe-overline{font-size:12px;font-weight:800;color:#3768c5}
.fitnote-recipe-head h2{font-size:22px;line-height:1.4;margin:6px 0 5px}
.fitnote-recipe-muted{font-size:12px;line-height:1.7;color:#71809a}
.fitnote-recipe-close{border:0;flex:none;background:#f0f4fb;border-radius:50%;width:37px;height:37px;color:#4a648d;font-size:24px;cursor:pointer}
.fitnote-recipe-info{background:#f1f6ff;border-radius:15px;padding:14px;margin:16px 0}
.fitnote-recipe-numbers{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;text-align:center}
.fitnote-recipe-numbers b{display:block;font-size:17px}.fitnote-recipe-numbers small{display:block;color:#7587a7;font-size:10px}
.fitnote-recipe-warning{font-size:11px;color:#6e7f9f;line-height:1.6;margin-top:10px}
.fitnote-recipe-section{margin:22px 0}
.fitnote-recipe-sectionhead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:11px}
.fitnote-recipe-section h3{font-size:17px;margin:0 0 13px}
.fitnote-recipe-sectionhead h3{margin:0}.fitnote-recipe-sectionhead span{font-size:11px;color:#8d9bb0}
.fitnote-recipe-ingredients{border:1px solid #e5ebf4;border-radius:15px;overflow:hidden}
.fitnote-recipe-ingredients label{display:flex;align-items:center;gap:12px;padding:12px 13px;border-bottom:1px solid #e9eef5;font-size:13px;cursor:pointer}
.fitnote-recipe-ingredients label:last-child{border-bottom:0}
.fitnote-recipe-ingredients input{width:18px;height:18px;accent-color:#346cf6;flex:none}
.fitnote-recipe-ingredients input:checked+span{text-decoration:line-through;color:#9ba7b8}
.fitnote-recipe-steps{list-style:none;counter-reset:step;padding:0;margin:0;display:grid;gap:10px}
.fitnote-recipe-steps li{counter-increment:step;position:relative;padding:13px 13px 13px 50px;background:#f7f9fd;border-radius:13px;font-size:13px;line-height:1.7;min-height:47px}
.fitnote-recipe-steps li:before{content:counter(step);position:absolute;left:13px;top:12px;background:#e3eeff;color:#326df6;font-weight:900;width:25px;height:25px;display:grid;place-items:center;border-radius:9px}
.fitnote-recipe-editlabel{display:grid;gap:7px;font-size:12px;font-weight:800;color:#61728c;margin:12px 0}
.fitnote-recipe-editlabel textarea{width:100%;font:inherit;min-height:75px;padding:10px;border:1px solid #dbe5f3;border-radius:12px;resize:vertical}
.fitnote-recipe-footer{display:flex;gap:8px;margin-top:18px}
.fitnote-recipe-footer button,.fitnote-recipe-save{flex:1;padding:13px 9px;border-radius:13px;font-size:12px;font-weight:800;cursor:pointer}
.fitnote-recipe-copy{background:#fff;color:#326df6;border:1px solid #c9dafb}
.fitnote-recipe-done,.fitnote-recipe-save{background:#326df6;color:white;border:0}
@media(min-width:600px){.fitnote-recipe-shade{align-items:center}.fitnote-recipe-sheet{border-radius:22px;max-height:90vh}}
`;
document.head.append(style);
window.fitnoteRecipeCount=()=>src.length;
})();