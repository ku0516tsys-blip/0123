(function fitnotePlannerAddon(){
'use strict';
if(window.__fitnotePlannerAddon)return;window.__fitnotePlannerAddon=true;
// 代表的な1人前の推定値。料理・店・量で大きく異なる。
const raw=[
['朝食','卵・納豆の和朝食','🍳','卵1個・納豆・白米150g・味噌汁',485,20,13,68,'balanced,lowfat','和食'],
['朝食','鮭とご飯の朝食','🐟','鮭80g・白米150g・味噌汁',490,25,13,66,'balanced,lowfat','和食'],
['朝食','卵かけご飯と豆腐','🍚','白米180g・卵・豆腐',465,19,12,67,'balanced,lowfat','和食'],
['朝食','鶏むねおにぎりセット','🍙','おにぎり2個・サラダチキン',470,31,5,75,'balanced,lowfat','コンビニ'],
['朝食','オートミール・バナナ','🥣','オートミール50g・牛乳・バナナ',435,16,10,72,'balanced,lowfat','洋食'],
['朝食','ギリシャヨーグルトボウル','🍓','ギリシャヨーグルト・ベリー・グラノーラ',375,25,6,56,'balanced,lowfat','洋食'],
['朝食','全粒パンとスクランブルエッグ','🍞','全粒食パン2枚・卵2個',475,23,19,50,'balanced','洋食'],
['朝食','ツナとアボカドのトースト','🥑','全粒パン・ツナ・アボカド',500,27,22,48,'balanced,lowcarb','洋食'],
['朝食','卵とアボカド','🥑','卵2個・アボカド・葉野菜',365,17,29,12,'lowcarb,keto','洋食'],
['朝食','納豆豆腐ボウル','🥗','納豆・豆腐・卵・小鉢',365,29,19,20,'lowcarb,balanced','和食'],
['朝食','サラダチキンとゆで卵','🥚','サラダチキン・ゆで卵2個・サラダ',350,38,17,9,'lowcarb,keto','コンビニ'],
['朝食','プロテインパンケーキ','🥞','高タンパクパンケーキ・果物',455,30,12,55,'balanced,lowfat','洋食'],
['昼食','鶏むね肉の定食','🍗','鶏むね150g・白米200g・温野菜',600,43,10,83,'balanced,lowfat','和食'],
['昼食','焼き鮭定食','🐟','鮭120g・ご飯200g・味噌汁',655,35,18,88,'balanced','和食'],
['昼食','豚ヒレ生姜焼き定食','🍱','豚ヒレ・白米180g・サラダ',630,38,17,82,'balanced,lowfat','和食'],
['昼食','サーモンとアボカド丼','🍣','サーモン・アボカド・ご飯180g',685,31,26,77,'balanced','和食'],
['昼食','親子丼','🍚','鶏肉・卵・ご飯200g',640,30,16,91,'balanced','和食'],
['昼食','ツナとトマトのパスタ','🍝','パスタ乾麺100g・ツナ・トマト',615,29,16,84,'balanced,lowfat','洋食'],
['昼食','チキンと玄米のプレート','🥗','鶏むね・玄米・ブロッコリー',590,43,12,72,'balanced,lowfat','洋食'],
['昼食','ローストビーフ丼','🥩','赤身牛肉・ご飯180g・野菜',680,40,18,86,'balanced','和食'],
['昼食','そばとゆで卵','🍜','かけそば・ゆで卵2個',515,24,13,73,'balanced,lowfat','和食'],
['昼食','チキンサラダボウル','🥗','鶏むね150g・豆・野菜・オイル',440,44,18,24,'lowcarb,keto','洋食'],
['昼食','牛赤身と温野菜','🥩','牛赤身180g・温野菜・豆腐',510,47,28,16,'lowcarb,keto','洋食'],
['昼食','鮭とブロッコリーのプレート','🐟','サーモン150g・ブロッコリー・オイル',525,37,36,12,'lowcarb,keto','洋食'],
['昼食','サラダチキン＋おにぎり','🍙','サラダチキン・おにぎり2個',490,35,5,72,'balanced,lowfat','コンビニ'],
['昼食','豆腐ハンバーグ定食','🍱','豆腐ハンバーグ・白米・味噌汁',585,27,17,80,'balanced,lowfat','和食'],
['夕食','焼き魚の和定食','🐟','焼きサバ・ご飯150g・小鉢',640,31,24,72,'balanced','和食'],
['夕食','鶏胸肉のグリル','🍗','鶏むね200g・じゃがいも・野菜',590,53,13,62,'balanced,lowfat','洋食'],
['夕食','豚ヒレのソテー定食','🍱','豚ヒレ180g・ご飯160g・きのこ',605,45,13,78,'balanced,lowfat','和食'],
['夕食','牛赤身のステーキプレート','🥩','赤身ステーキ180g・温野菜・ご飯120g',695,47,26,63,'balanced','洋食'],
['夕食','タラと野菜の蒸し料理','🐟','タラ200g・ご飯180g・野菜',530,42,6,79,'balanced,lowfat','和食'],
['夕食','鶏そぼろ丼','🍚','鶏そぼろ・卵・白米180g',635,33,18,86,'balanced','和食'],
['夕食','豆腐チャンプルー定食','🥢','豆腐・豚肉・野菜・ご飯',660,32,27,70,'balanced','和食'],
['夕食','海鮮ちらし丼','🍣','刺身・卵・酢飯200g',650,37,13,93,'balanced,lowfat','和食'],
['夕食','チキントマト煮込み','🍅','鶏もも・トマト・豆・少量ご飯',595,43,20,57,'balanced','洋食'],
['夕食','鶏肉ときのこの鍋','🍲','鶏むね・きのこ・豆腐・葉野菜',425,46,14,20,'lowcarb,keto','和食'],
['夕食','サーモンのバターソテー','🐟','サーモン150g・葉野菜・チーズ',560,36,40,10,'lowcarb,keto','洋食'],
['夕食','牛肉とアボカドサラダ','🥑','牛赤身・アボカド・サラダ',570,42,38,14,'lowcarb,keto','洋食'],
['夕食','鶏むねと豆腐のスープ','🍲','鶏むね・豆腐・野菜スープ',375,49,9,22,'lowcarb,lowfat','和食'],
['夕食','ブリ照り焼き定食','🐟','ブリ120g・ご飯160g・味噌汁',665,32,27,73,'balanced','和食'],
['間食','バナナと無脂肪ヨーグルト','🍌','バナナ1本・無脂肪ヨーグルト150g',180,12,1,32,'balanced,lowfat','簡単'],
['間食','プロテイン1杯','🥤','プロテイン1杯・水',120,24,2,3,'balanced,lowfat,lowcarb','簡単'],
['間食','ギリシャヨーグルトとベリー','🍓','高タンパクヨーグルト・ベリー',180,19,2,22,'balanced,lowfat,lowcarb','簡単'],
['間食','ゆで卵2個','🥚','ゆで卵2個',152,12,10,1,'balanced,lowcarb,keto','コンビニ'],
['間食','ナッツ25g','🥜','ミックスナッツ25g',155,5,13,5,'lowcarb,keto','コンビニ'],
['間食','高タンパクバー','🍫','プロテインバー1本（一般的な例）',205,16,8,18,'balanced,lowfat','コンビニ'],
['間食','枝豆','🫛','ゆで枝豆100g',125,12,6,9,'balanced,lowcarb','和食'],
['間食','りんごとカッテージチーズ','🍎','りんご・低脂肪チーズ',185,12,3,29,'balanced,lowfat','洋食'],
['間食','ツナとチーズ','🧀','水煮ツナ・チーズ25g',185,22,9,1,'lowcarb,keto','コンビニ'],
['間食','焼き芋と牛乳','🍠','焼き芋100g・牛乳100ml',220,5,4,42,'balanced,lowfat','簡単'],
['間食','冷ややっこ','🥢','豆腐150g・ねぎ・醤油',100,9,5,4,'lowcarb,keto','和食'],
['間食','バナナとアーモンド','🍌','バナナ・アーモンド15g',184,4,8,27,'balanced','簡単']
];
const BANK=raw.map((r,i)=>({id:i,slot:r[0],name:r[1],emoji:r[2],detail:r[3],k:r[4],p:r[5],f:r[6],c:r[7],styles:r[8].split(','),genre:r[9],origin:'library'}));
const SLOTS=['朝食','昼食','夕食','間食'];
const weights={'朝食':.25,'昼食':.35,'夕食':.32,'間食':.08};
let pickSlot='',pickGenre='すべて',planFormOpen=false,recipeEditIndex=null;
state.recipePlans??={};state.recipeCustom??=[];state.recipeSaved??=[];
function ensurePlanner(){state.recipePlans??={};state.recipeCustom??=[];state.recipeSaved??=[];}
function unique(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function activeSlots(){
 const prefs=state.profile.mealTiming||SLOTS;
 const slots=SLOTS.filter(k=>prefs.includes(k));
 return slots.length?slots:SLOTS;
}
function planTotal(rows){
 const total={k:0,p:0,f:0,c:0,unknown:0};
 for(const x of rows){if([x.k,x.p,x.f,x.c].some(n=>n==null||!Number.isFinite(Number(n)))){total.unknown++;continue}for(const key of ['k','p','f','c'])total[key]+=Number(x[key]);}
 for(const key of ['p','f','c'])total[key]=Math.round(total[key]*10)/10;
 total.k=Math.round(total.k);return total;
}
function dateSeed(date){return [...date].reduce((a,b)=>((a*31+b.charCodeAt(0))>>>0),17)}
function autoPick(slot,date,roundNo,selected=[]){
 const style=state.profile.style||'balanced',t=targets(date);
 const match=BANK.filter(x=>x.slot===slot&&(x.styles.includes(style)||x.styles.includes('balanced')));
 const candidates=match.length?match:BANK.filter(x=>x.slot===slot);
 const span=activeSlots().reduce((s,k)=>s+weights[k],0);
 const targetP=t.protein*weights[slot]/span,targetK=t.kcal*weights[slot]/span;
 const salt=dateSeed(date)+roundNo*37+SLOTS.indexOf(slot)*19;
 return [...candidates].sort((a,b)=>{
   const score=x=>Math.abs(x.k-targetK)/Math.max(250,targetK)*.7+Math.abs(x.p-targetP)/Math.max(15,targetP)*.35+(selected.some(y=>y.name===x.name)?.6:0)+(((x.id*17+salt)%37)/160);
   return score(a)-score(b);
 })[roundNo%candidates.length];
}
function newPlan(date,roundNo=0){
 const selected=[];
 for(const slot of activeSlots()){const rec=autoPick(slot,date,roundNo,selected);if(rec)selected.push({...rec,uid:unique()})}
 return {mode:'auto',round:roundNo,items:selected};
}
function currentPlan(){
 ensurePlanner();if(!state.recipePlans[chosenDate]){state.recipePlans[chosenDate]=newPlan(chosenDate);save()}
 return state.recipePlans[chosenDate];
}
function recipeRow(x,index,plan){
 const manual=plan.mode==='manual';
 return `<div class="plan-row"><div class="plan-emoji">${x.emoji||'🍽️'}</div><div class="grow">
  <b>${esc(x.name)}</b><div class="tiny">${esc(x.detail||'材料は自由に調整')}</div>
  <div class="plan-nutrients">${x.k==null?'栄養素未設定':`${x.k} kcal ・ P${x.p} / F${x.f} / C${x.c} g`}</div>
  <button type="button" class="recipe-open" onclick="planShowRecipe(${index})">📖 材料・作り方を見る ›</button>
 </div><div class="plan-acts">
 <button type="button" class="btn white sm" onclick="planLog(${index})">食べた</button>
 <button type="button" class="plan-icon" onclick="planSaveRecipe(${index})" title="この献立を保存">☆</button>
 ${manual?`<button type="button" class="plan-icon" onclick="planRemove(${index})" title="削除">×</button>`:`<button type="button" class="plan-icon" onclick="planOpenPicker('${x.slot}')" title="候補を変更">↻</button>`}
 </div></div>`;
}
function targetCompare(items){
 const t=targets(chosenDate),m=planTotal(items),u=m.unknown;
 const fields=[['カロリー',m.k,t.kcal,'kcal'],['P',m.p,t.protein,'g'],['F',m.f,t.fat,'g'],['C',m.c,t.carbs,'g']];
 return `<div class="card" style="margin-top:12px"><div class="row"><b>献立の栄養目安</b><span class="badge gray">${items.length}品</span></div>
 <div class="plan-macro-grid">${fields.map(([label,v,tar,unit])=>`<div><div class="tiny">${label}</div><b>${v}${unit}</b><div class="tiny">目標 ${tar}${unit}</div><div class="bar" style="height:5px;margin-top:7px"><span style="width:${Math.min(100,100*v/Math.max(1,tar))}%"></span></div></div>`).join('')}</div>
 ${u?`<div class="notice" style="margin-top:10px">${u}品は栄養素未設定のため合計に含めていません。</div>`:''}
 <div class="note">表示は1食分の概算。食材の重量・調味料・調理油を反映した正確な栄養保証ではありません。プロテイン目標は別途設定できます。</div></div>`;
}
function picker(){
 const p=currentPlan(),slot=pickSlot;if(!slot)return '';
 const style=state.profile.style||'balanced',gen=['すべて','和食','洋食','コンビニ','簡単'];
 const pool=[...BANK,...state.recipeCustom].filter(x=>x.slot===slot).filter(x=>pickGenre==='すべて'||x.genre===pickGenre).filter(x=>p.mode==='manual'||x.styles?.includes(style)||pickGenre!=='すべて'||x.origin==='custom');
 const visible=pool.length?pool:BANK.filter(x=>x.slot===slot);
 return `<div class="card" style="margin-top:12px;border-color:#cbdcff">
 <div class="row"><b>${esc(slot)}の候補を選ぶ</b><button class="btn gray sm" onclick="planClosePicker()">閉じる</button></div>
 <div class="plan-chips">${gen.map(x=>`<button class="${pickGenre===x?'active':''}" onclick="planGenre('${x}')">${x}</button>`).join('')}</div>
 <div class="plan-candidates">${visible.map(x=>`<div class="plan-candidate"><div class="plan-emoji">${x.emoji||'🍽️'}</div><div class="grow"><b>${esc(x.name)}</b><div class="tiny">${esc(x.detail||'')}</div><div class="tiny">${x.k??'—'}kcal ・ P${x.p??'—'} F${x.f??'—'} C${x.c??'—'}</div></div><button class="btn white sm" onclick="planShowCandidate('${x.origin==='custom'?'c':'b'}',${x.id})">レシピ</button><button class="btn white sm" onclick="planChoose('${x.origin==='custom'?'c':'b'}',${x.id})">選択</button></div>`).join('')}</div>
 </div>`;
}
function customForm(){
 if(!planFormOpen)return '';
 const old=recipeEditIndex!=null?state.recipeCustom.find(x=>x.id===recipeEditIndex):null;
 return `<div class="card" style="border-color:#b7d1ff"><div class="row"><b>自分の献立を追加</b><button class="btn gray sm" onclick="planToggleForm()">閉じる</button></div>
 <div class="stack" style="margin-top:13px">
 <div class="field"><label>料理名</label><input id="recipeName" maxlength="60" value="${esc(old?.name||'')}" placeholder="例：鶏むね肉のトマト煮込み"></div>
 <div class="field"><label>材料・分量メモ</label><input id="recipeDetail" maxlength="160" value="${esc(old?.detail||'')}" placeholder="例：鶏むね150g、トマト、白米180g"></div>
 <div class="field"><label>作り方・手順（任意）</label><textarea id="recipeSteps" rows="4" maxlength="1000" placeholder="例：肉を切って下味をつけ、フライパンで焼く。">${esc(old?.steps||'')}</textarea></div>
 <div class="field"><label>食事タイミング</label><select id="recipeSlot">${SLOTS.map(x=>`<option ${old?.slot===x?'selected':pickSlot===x?'selected':''}>${x}</option>`).join('')}</select></div>
 <div class="grid2">${[['recipeK','k','カロリー（kcal）'],['recipeP','p','P（g）'],['recipeF','f','F（g）'],['recipeC','c','C（g）']].map(([id,key,label])=>`<div class="field"><label>${label}</label><input type="number" id="${id}" min="0" max="15000" step="0.1" placeholder="任意" value="${old?.[key]??''}"></div>`).join('')}</div>
 <button class="btn white full" onclick="planEstimateCustom()">材料メモから栄養素を概算</button><div class="note">不明なら空欄で保存可能。栄養値は食材の一般的な参考値で、調理油や調味料は反映されない場合があります。自作の献立は次回も選べます。</div>
 <button class="btn full" onclick="planStoreCustom()">この献立を保存して追加</button></div></div>`;
}
function smartPlanView(){
 const day=currentPlan(),mode=day.mode,items=day.items;
 const all=[...new Set(BANK.map(x=>x.name))].length;
 return title('献立を作る・選ぶ','目標と好みに合わせて、毎日の食事を自由に設計。')
 +`<div class="plan-modes">
 <button class="${mode==='auto'?'active':''}" onclick="planSwitchMode('auto')"><b>✨ おまかせ提案</b><span>目標PFCから自動で候補を選ぶ</span></button>
 <button class="${mode==='manual'?'active':''}" onclick="planSwitchMode('manual')"><b>✏️ 自分で献立作成</b><span>料理を自由に選択・登録する</span></button></div>
 <div class="tiny" style="margin:6px 0 13px">おまかせは食品データによる自動提案です（生成AIによるリアルタイム作成ではありません）。${all}種類の候補から選択できます。</div>
 <div class="card" style="margin-top:13px">
 <div class="row"><b>日付を選択</b><input type="date" id="planDate" min="${today}" value="${chosenDate}" onchange="planDateChange(this.value)" style="padding:8px 6px;border:1px solid #e1e8f3;border-radius:9px;background:white;max-width:170px"></div>
 <div class="plan-days">${Array.from({length:7},(_,i)=>shifted(today,i)).map(d=>`<button class="${chosenDate===d?'active':''}" onclick="planDateChange('${d}')"><span>${names[parseDate(d).getDay()]}</span><b>${parseDate(d).getDate()}</b></button>`).join('')}</div></div>
 <div class="card" style="margin-top:12px"><div class="row"><div><b>${prettyDate(chosenDate)}の献立</b><div class="tiny">${mode==='auto'?'おまかせ提案':'自由に組み合わせ'}</div></div><span class="badge">${items.length}品</span></div>
 <div style="margin-top:12px">${items.length?items.map((x,i)=>recipeRow(x,i,day)).join(''):'<div class="small">まだ献立がありません。「メニューから追加」または「自作献立」から登録してください。</div>'}</div>
 ${mode==='auto'?`<div class="row wrap" style="margin-top:12px"><button class="btn full" onclick="planReroll()">🔄 別の献立を提案</button><button class="btn white full" onclick="planGenerateWeek()">次の7日間を一括作成</button></div>`:`<div class="row" style="margin-top:12px"><button class="btn white" onclick="planOpenPicker('昼食')">メニューから追加</button><button class="btn" onclick="planToggleForm()">＋ 自作献立</button></div>`}
 </div>
 ${mode==='manual'?`<div class="card" style="margin-top:11px"><div class="row"><b>食事ごとに選ぶ</b><span class="badge gray">候補 ${BANK.length} 品</span></div><div class="plan-slot-buttons">${SLOTS.map(x=>`<button onclick="planOpenPicker('${x}')">${x} ＋</button>`).join('')}</div></div>`:''}
 ${targetCompare(items)}
 ${picker()}${customForm()}
 <div class="callout" style="margin-top:15px">メニューの☆でお気に入り保存が可能。食べたら「食べた」を押すと、実際の食事記録にも登録します。記録される栄養素は目安です。</div>
 ${planFavorites()}${footer()}`;
}
window.smartPlanView=smartPlanView;
function planFavorites(){
 return state.recipeSaved.length?`<div class="card" style="margin-top:12px"><b>⭐ 保存した献立</b><div class="plan-saved">${state.recipeSaved.map((x,i)=>`<div class="plan-candidate"><span class="plan-emoji">${x.emoji||'🍽️'}</span><div class="grow"><b>${esc(x.name)}</b><div class="tiny">${esc(x.slot)} ・ ${x.k??'—'} kcal</div></div><button class="btn white sm" onclick="planShowSavedRecipe(${i})">レシピ</button><button class="btn white sm" onclick="planUseFavorite(${i})">使う</button><button class="plan-icon" onclick="planRemoveFavorite(${i})">×</button></div>`).join('')}</div></div>`:'';
}
window.planDateChange=function(d){if(!/^\d{4}-\d{2}-\d{2}$/.test(d)||d<today)return;chosenDate=d;pickSlot='';planFormOpen=false;render();};
window.planSwitchMode=function(mode){
 const p=currentPlan();
 if(p.mode===mode)return;
 if(p.mode==='manual'&&p.items.length&&!window.confirm('自作したこの日の献立をおまかせ提案に切り替えますか？（自作メニューの登録は残ります）'))return;
 state.recipePlans[chosenDate]=mode==='auto'?newPlan(chosenDate):{mode:'manual',round:0,items:[]};pickSlot='';planFormOpen=false;save();render();
};
window.planReroll=function(){let p=currentPlan();if(p.mode!=='auto')return;state.recipePlans[chosenDate]=newPlan(chosenDate,p.round+1);save();render();notify('別の献立候補を選びました');};
window.planGenerateWeek=function(){
 const dates=Array.from({length:7},(_,i)=>shifted(chosenDate,i));
 if(dates.some(d=>state.recipePlans[d]?.mode==='manual'&&state.recipePlans[d]?.items.length)&&!window.confirm('7日間に手作り献立が含まれます。自動提案で上書きしますか？'))return;
 dates.forEach((d,i)=>state.recipePlans[d]=newPlan(d,i));save();render();notify('7日間の献立を作成しました');
};
window.planOpenPicker=function(slot){pickSlot=slot;pickGenre='すべて';planFormOpen=false;render();};
window.planClosePicker=function(){pickSlot='';render();};
window.planGenre=function(g){pickGenre=g;render();};
window.planChoose=function(kind,id){
 const x=kind==='c'?state.recipeCustom.find(t=>t.id===id):BANK.find(t=>t.id===id);
 if(!x)return;const p=currentPlan(),item={...x,uid:unique()};
 if(p.mode==='auto'){const idx=p.items.findIndex(m=>m.slot===item.slot);if(idx>=0)p.items[idx]=item;else p.items.push(item)}
 else p.items.push(item);
 pickSlot='';save();render();notify('「'+x.name+'」を献立に追加しました');
};
window.planRemove=function(i){const p=currentPlan();if(p.mode!=='manual')return;p.items.splice(i,1);save();render();};
window.planSaveRecipe=function(i){
 const x=currentPlan().items[i];if(!x)return;
 if(state.recipeSaved.some(a=>a.name===x.name&&a.slot===x.slot)){notify('すでに保存済みです');return;}
 state.recipeSaved.unshift({...x,uid:unique()});save();render();notify('お気に入りの献立に保存しました');
};
window.planUseFavorite=function(i){
 const x=state.recipeSaved[i];if(!x)return;const p=currentPlan(),item={...x,uid:unique()};
 if(p.mode==='auto'){const idx=p.items.findIndex(y=>y.slot===item.slot);if(idx>=0)p.items[idx]=item;else p.items.push(item)}
 else p.items.push(item);
 save();render();notify('保存した献立を追加しました');
};
window.planRemoveFavorite=function(i){state.recipeSaved.splice(i,1);save();render()};
window.planToggleForm=function(){planFormOpen=!planFormOpen;pickSlot='';render()};
window.planEstimateCustom=function(){
 const name=document.getElementById('recipeName')?.value.trim()||'';
 const ingredients=document.getElementById('recipeDetail')?.value.trim()||name;
 const estimate=window.fitnoteEstimateFood?.(ingredients);
 if(!estimate?.ok){notify('対応する食品が見つかりません。栄養素を手入力してください');return}
 if(estimate.missing.length){notify('未対応の食品があります。栄養素を手動で確認してください');return}
 for(const [id,key] of [['recipeK','k'],['recipeP','p'],['recipeF','f'],['recipeC','c']]){const node=document.getElementById(id);if(node)node.value=estimate.sum[key];}
 notify('材料からおおよその栄養素を入力しました');
};
window.planStoreCustom=function(){
 const name=document.getElementById('recipeName')?.value.trim().slice(0,60)||'',detail=document.getElementById('recipeDetail')?.value.trim().slice(0,160)||'',steps=document.getElementById('recipeSteps')?.value.trim().slice(0,1000)||'',slot=document.getElementById('recipeSlot')?.value||'昼食';
 if(!name)return notify('料理名を入力してください');
 const values=['recipeK','recipeP','recipeF','recipeC'].map(x=>document.getElementById(x)?.value.trim()??'');
 let nutrients=[null,null,null,null];
 if(values.some(Boolean)){
   if(values.some(v=>v===''))return notify('栄養素はすべて入力するか、全部空欄にしてください');
   nutrients=values.map((v,i)=>{const n=Number(v);return Number.isFinite(n)&&n>=0&&n<=(i===0?15000:1500)?Math.round(n*10)/10:null});
   if(nutrients.some(v=>v===null))return notify('栄養素の値を確認してください');
 }
 const item={id:Date.now()+Math.floor(Math.random()*1000),uid:unique(),slot,name,detail,steps,emoji:'🍽️',k:nutrients[0],p:nutrients[1],f:nutrients[2],c:nutrients[3],styles:['balanced','lowfat','lowcarb','keto'],genre:'自作',origin:'custom'};
 state.recipeCustom.push(item);
 const p=currentPlan();
 if(p.mode==='auto')state.recipePlans[chosenDate]={mode:'manual',round:0,items:[item]};else p.items.push({...item,uid:unique()});
 planFormOpen=false;save();render();notify('自作献立を保存しました');
};
window.planShowRecipe=function(i){const x=currentPlan().items[i];if(x&&window.fitnoteOpenRecipe)window.fitnoteOpenRecipe(x);};
window.planShowCandidate=function(kind,id){const x=kind==='c'?state.recipeCustom.find(t=>t.id===id):BANK.find(t=>t.id===id);if(x&&window.fitnoteOpenRecipe)window.fitnoteOpenRecipe(x);};
window.planShowSavedRecipe=function(i){const x=state.recipeSaved[i];if(x&&window.fitnoteOpenRecipe)window.fitnoteOpenRecipe(x);};
window.planLog=function(i){
 const x=currentPlan().items[i];if(!x)return;if(chosenDate>today)return notify('未来の日付は記録できません');
 state.foodEntries??=[];
 state.foodEntries.push({id:'fromplan_'+unique(),name:x.name,slot:x.slot,date:chosenDate,k:x.k??null,p:x.p??null,f:x.f??null,c:x.c??null,createdAt:new Date().toISOString(),photo:null});
 save();render();notify('食事記録に追加しました');
};
const style=document.createElement('style');style.textContent=`
.plan-modes{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:17px}.plan-modes button{padding:13px 9px;text-align:left;border-radius:15px;border:1px solid #e2eaf6;background:#fff;color:#7f8aa3}.plan-modes button.active{border-color:#679aff;background:#ebf3ff;color:#285ac0}.plan-modes b{font-size:13px;display:block}.plan-modes span{display:block;font-size:10px;margin-top:5px}.plan-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;margin-top:12px}.plan-days button{display:grid;gap:4px;place-items:center;padding:9px 0;border:1px solid #ebeff6;border-radius:11px;background:#fff;color:#8993a7}.plan-days button.active{background:#ebf3ff;border-color:#7ba5ff;color:#326df6}.plan-days button span{font-size:10px}.plan-days button b{font-size:15px}.recipe-open{border:0;background:transparent;color:#326df6;font-size:12px;font-weight:800;text-align:left;padding:8px 0 0;cursor:pointer}.plan-row{display:flex;align-items:center;gap:9px;border-bottom:1px solid #ebeff6;padding:11px 0}.plan-row:last-child{border-bottom:0}.plan-row b,.plan-candidate b{font-size:12px}.plan-emoji{min-width:37px;height:37px;background:#f3f7fe;border-radius:12px;display:grid;place-items:center;font-size:21px}.plan-nutrients{font-size:11px;font-weight:800;color:#4876b5;margin-top:3px}.plan-acts{display:flex;flex-direction:column;gap:4px}.plan-acts button{min-width:45px}.plan-icon{border:1px solid #e8edf6;border-radius:9px;background:white;color:#52709c;font-size:15px;cursor:pointer}.plan-macro-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:13px;margin-top:13px}.plan-macro-grid>div{background:#f5f8fd;padding:11px;border-radius:12px}.plan-macro-grid b{font-size:18px}.plan-chips{display:flex;overflow-x:auto;gap:6px;padding:13px 0;scrollbar-width:none}.plan-chips button{white-space:nowrap;background:#f2f5fa;border:1px solid #e6ebf3;color:#7b879a;padding:7px 12px;border-radius:30px;font-size:12px}.plan-chips button.active{background:#e6f0ff;color:#326df6;border-color:#b6d2ff}.plan-candidates{max-height:440px;overflow-y:auto}.plan-candidate{display:flex;gap:8px;align-items:center;padding:10px 0;border-bottom:1px solid #edf0f6}.plan-candidate:last-child{border-bottom:0}.plan-slot-buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-top:12px}.plan-slot-buttons button{background:#f0f5ff;border:1px solid #dce8fd;border-radius:12px;color:#386cbb;padding:10px 3px;font-size:11px}#recipeSteps{width:100%;padding:11px 12px;font:inherit;background:#f8fafd;color:#17243d;border:1px solid #e3e9f2;border-radius:11px;resize:vertical}.plan-saved{margin-top:13px}@media(min-width:520px){.plan-macro-grid{grid-template-columns:repeat(4,1fr)}}
`;document.head.append(style);
render();
})();