(function fitnoteFoodUpgrade(){
'use strict';
const FOOD_DB=[
 {n:'白米・ご飯',a:['白米','ごはん','ご飯','ライス'],u:'g',q:150,k:234,p:3.8,f:.5,c:55.7},
 {n:'玄米ご飯',a:['玄米'],u:'g',q:150,k:228,p:4.2,f:1.5,c:51},
 {n:'鶏むね肉（皮なし）',a:['鶏むね肉','鶏胸肉','むね肉','鶏胸'],u:'g',q:100,k:105,p:23.3,f:1.9,c:0},
 {n:'サラダチキン',a:['サラダチキン'],u:'g',q:110,k:115,p:25,f:1.5,c:1},
 {n:'鶏もも肉',a:['鶏もも','もも肉','チキンソテー'],u:'g',q:100,k:190,p:17,f:14,c:0},
 {n:'ゆで卵・卵',a:['ゆで卵','玉子','たまご','卵'],u:'個',q:1,gram:50,k:76,p:6.2,f:5.2,c:.2},
 {n:'納豆',a:['納豆'],u:'パック',q:1,gram:45,k:85,p:7.5,f:4.5,c:5.4},
 {n:'鮭',a:['焼き鮭','サーモン','鮭','シャケ'],u:'g',q:100,k:180,p:22,f:10,c:0},
 {n:'マグロ赤身',a:['まぐろ','マグロ','鮪'],u:'g',q:100,k:115,p:25,f:1.4,c:0},
 {n:'サバ',a:['鯖','サバ','さば'],u:'g',q:100,k:210,p:20,f:14,c:0},
 {n:'刺身盛り合わせ',a:['刺身盛り','お刺身','刺身'],u:'g',q:120,k:160,p:28,f:5,c:1},
 {n:'豆腐',a:['木綿豆腐','絹豆腐','豆腐'],u:'g',q:150,k:95,p:8,f:5,c:3},
 {n:'牛赤身肉',a:['牛赤身','赤身肉','牛ステーキ','ステーキ'],u:'g',q:100,k:185,p:21,f:11,c:0},
 {n:'豚ロース',a:['豚ロース','豚肉','生姜焼き'],u:'g',q:100,k:235,p:19,f:17,c:1},
 {n:'ブロッコリー',a:['ブロッコリー'],u:'g',q:100,k:37,p:5.4,f:.6,c:6.6},
 {n:'サラダ（ドレッシング別）',a:['野菜サラダ','サラダ','温野菜'],u:'g',q:100,k:30,p:1.5,f:.3,c:5},
 {n:'味噌汁',a:['みそ汁','味噌汁'],u:'杯',q:1,gram:180,k:40,p:2.5,f:1.5,c:4},
 {n:'食パン',a:['食パン','トースト'],u:'枚',q:1,gram:60,k:150,p:5.5,f:2.7,c:28},
 {n:'ヨーグルト（無糖）',a:['ギリシャヨーグルト','ヨーグルト'],u:'g',q:100,k:62,p:4.0,f:3.0,c:5},
 {n:'牛乳',a:['牛乳','ミルク'],u:'ml',q:200,k:125,p:6.6,f:7.6,c:9.5},
 {n:'プロテイン（一般例）',a:['プロテイン','ホエイ'],u:'杯',q:1,gram:30,k:120,p:24,f:2,c:3},
 {n:'バナナ',a:['バナナ'],u:'本',q:1,gram:100,k:93,p:1.1,f:.2,c:22.5},
 {n:'りんご',a:['りんご','リンゴ'],u:'g',q:100,k:56,p:.1,f:.2,c:15},
 {n:'オートミール',a:['オートミール'],u:'g',q:40,k:152,p:5.2,f:2.4,c:27},
 {n:'アーモンド・ナッツ',a:['ミックスナッツ','アーモンド','ナッツ'],u:'g',q:25,k:151,p:5.0,f:13,c:5},
 {n:'白米おにぎり',a:['おにぎり','オニギリ'],u:'個',q:1,gram:110,k:185,p:3.5,f:.5,c:41},
 {n:'うどん',a:['うどん'],u:'杯',q:1,gram:350,k:330,p:10,f:2,c:67},
 {n:'そば',a:['蕎麦','そば'],u:'杯',q:1,gram:350,k:360,p:13,f:3,c:67},
 {n:'ラーメン',a:['ラーメン','中華そば'],u:'杯',q:1,gram:450,k:540,p:20,f:19,c:72},
 {n:'パスタ（調理済）',a:['スパゲッティ','パスタ'],u:'皿',q:1,gram:300,k:580,p:19,f:17,c:85},
 {n:'牛丼',a:['牛丼','ぎゅうどん'],u:'杯',q:1,gram:420,k:690,p:25,f:23,c:99},
 {n:'親子丼',a:['親子丼'],u:'杯',q:1,gram:420,k:640,p:29,f:16,c:94},
 {n:'カレーライス',a:['カレーライス','カレー'],u:'皿',q:1,gram:450,k:720,p:18,f:24,c:108},
 {n:'チャーハン',a:['チャーハン','炒飯'],u:'皿',q:1,gram:350,k:650,p:17,f:22,c:91},
 {n:'唐揚げ',a:['から揚げ','唐揚げ','からあげ'],u:'g',q:100,k:300,p:18,f:22,c:12},
 {n:'唐揚げ弁当',a:['唐揚げ弁当','からあげ弁当'],u:'食',q:1,gram:500,k:850,p:32,f:32,c:105},
 {n:'焼き魚定食',a:['焼き魚定食','鮭定食'],u:'食',q:1,gram:550,k:690,p:34,f:20,c:88},
 {n:'ハンバーグ定食',a:['ハンバーグ定食','ハンバーグランチ'],u:'食',q:1,gram:550,k:850,p:33,f:39,c:89},
 {n:'焼肉定食',a:['焼肉定食'],u:'食',q:1,gram:570,k:880,p:36,f:37,c:92},
 {n:'寿司（2貫）',a:['にぎり寿司','寿司','すし'],u:'皿',q:1,gram:85,k:115,p:7,f:1.6,c:19},
 {n:'ハンバーガー',a:['ハンバーガー','バーガー'],u:'個',q:1,gram:180,k:410,p:19,f:20,c:38},
 {n:'ポテトフライ',a:['フライドポテト','ポテトフライ'],u:'g',q:100,k:320,p:4,f:15,c:41},
 {n:'チーズ',a:['チーズ'],u:'g',q:25,k:90,p:5.5,f:7.3,c:.5},
 {n:'アボカド',a:['アボカド'],u:'g',q:100,k:176,p:2.1,f:17.5,c:7.9},
 {n:'ツナ（水煮）',a:['ツナ缶','ツナ'],u:'g',q:70,k:75,p:16,f:.7,c:.2},
 {n:'枝豆',a:['枝豆'],u:'g',q:100,k:125,p:11.5,f:6.0,c:9},
 {n:'みかん',a:['みかん'],u:'個',q:1,gram:80,k:40,p:.6,f:.1,c:10}
];
FOOD_DB.sort((x,y)=>Math.max(...y.a.map(t=>t.length))-Math.max(...x.a.map(t=>t.length)));
let foodMode='actual',foodDraft=null,foodFormVisible=true,foodPreviewLabel='';
function ensureFoodState(){if(!Array.isArray(state.foodEntries))state.foodEntries=[];}
ensureFoodState();
function foodInputDate(){return chosenDate>today?today:chosenDate}
function foodEntries(date=foodInputDate()){ensureFoodState();return state.foodEntries.filter(x=>x.date===date).sort((a,b)=>String(b.createdAt||b.id).localeCompare(String(a.createdAt||a.id)));}
function foodTotals(date=foodInputDate()){let list=foodEntries(date),sum={k:0,p:0,f:0,c:0,count:list.length,unknown:0};list.forEach(x=>{if(x.k==null){sum.unknown++;return;}for(const key of ['k','p','f','c'])sum[key]+=Number(x[key])||0;});for(const key of ['p','f','c'])sum[key]=Math.round(sum[key]*10)/10;sum.k=Math.round(sum.k);return sum;}
function formatFoodParts(input){
 return input.replace(/(g|グラム|kg|個|杯|枚|本|皿|食|パック)\s+と\s*/g,'$1、')
 .replace(/(g|グラム|kg|個|杯|枚|本|皿|食|パック)と/g,'$1、')
 .replace(/(g|グラム|kg|個|杯|枚|本|皿|食|パック)\s+(?=[^\s、]{1,22}\d+(?:g|個|杯|枚|本))/g,'$1、')
 .split(/[、,，+＋\n/]/).map(x=>x.trim()).filter(Boolean);
}
function estimateFood(text){
 const bits=formatFoodParts(String(text||'').slice(0,150));
 if(!bits.length)return {ok:false,missing:[],items:[],sum:null};
 const sum={k:0,p:0,f:0,c:0},items=[],missing=[];
 for(const bit of bits){
  const food=FOOD_DB.find(x=>x.a.some(a=>bit.toLowerCase().includes(a.toLowerCase())));
  if(!food){missing.push(bit);continue;}
  let hit=bit.match(/(\d+(?:\.\d+)?)\s*(kg|g|グラム|ml|mL|個|枚|本|杯|皿|食|パック)/i),mul=1,quantity='';
  if(hit){
   let q=Number(hit[1]),unit=hit[2].toLowerCase();
   if(unit==='kg')mul=q*1000/(food.gram||food.q);
   else if(unit==='g'||unit==='グラム'||unit==='ml')mul=q/(food.gram||food.q);
   else if(food.u==='g'||food.u==='ml'){mul=q;quantity=q+unit+'（標準量を基準）';}
   else mul=q/(food.q||1);
   if(!quantity)quantity=q+hit[2];
  }else quantity=food.q+food.u+'（標準量）';
  if(!Number.isFinite(mul)||mul<=0||mul>30){missing.push(bit+'（数量を確認）');continue;}
  for(const k of ['k','p','f','c'])sum[k]+=(food[k]||0)*mul;
  items.push(food.n+' '+quantity);
 }
 sum.k=Math.round(sum.k);for(const k of ['p','f','c'])sum[k]=Math.round(sum[k]*10)/10;
 return {ok:items.length>0,missing,items,sum:items.length?sum:null};
}
function foodProgress(label,v,t,color){
 const pct=t>0?Math.max(0,Math.min(100,100*v/t)):0;
 return `<div style="margin:11px 0"><div class="row" style="font-size:12px"><b>${label}</b><span>${Math.round(v*10)/10} / ${t} g</span></div><div class="bar" style="margin-top:6px"><span style="width:${pct}%;background:${color}"></span></div></div>`;
}
function foodSummary(date,compact=false){
 const a=foodTotals(date),t=targets(date),remain=Math.max(0,t.kcal-a.k),over=Math.max(0,a.k-t.kcal);
 return `<div class="card food-sum" style="margin-top:12px">
  <div class="row"><b>${compact?'今日の食事記録':'実際に食べたものの集計'}</b><span class="badge green">${a.count} 件</span></div>
  <div class="row" style="align-items:flex-end;margin-top:12px"><div><div class="tiny">摂取カロリー（記録済み）</div><div class="heavy">${a.k.toLocaleString()} <span style="font-size:12px">kcal</span></div></div><div style="text-align:right"><div class="tiny">目標 ${t.kcal.toLocaleString()} kcal</div><b style="color:${over?'#bf6337':'#188b78'}">${over?'超過 '+over: '残り '+remain} kcal</b></div></div>
  <div class="bar" style="margin-top:12px"><span style="width:${Math.min(100,100*a.k/Math.max(1,t.kcal))}%;background:${over?'#eb9550':'var(--teal)'}"></span></div>
  ${foodProgress('P たんぱく質',a.p,t.protein,'var(--blue)')}
  ${foodProgress('F 脂質',a.f,t.fat,'var(--orange)')}
  ${foodProgress('C 炭水化物',a.c,t.carbs,'var(--teal)')}
  ${a.unknown?`<div class="notice">${a.unknown}件は栄養素未設定のため合計に含みません。</div>`:''}
  <div class="note">実際の摂取記録のみを集計。提案献立の完了チェックは加算しません。</div>
  ${compact?`<button class="btn white full" style="margin-top:12px" onclick="go('meals');setFoodMode('actual')">食べたものを記録する ＋</button>`:''}
 </div>`;
}
function foodForm(){
 const x=foodDraft||{name:'',slot:'昼食',k:null,p:null,f:null,c:null};
 return `<div class="card" style="margin-top:12px">
  <div class="row"><b>${foodDraft?'食事記録を編集':'食べたものを追加'}</b><span class="badge">自由入力</span></div>
  <div class="note" style="margin:8px 0 13px">料理名と量を入力して「栄養素を概算」を押すと、おおよそのPFCを入力します。</div>
  <div class="field" style="margin-top:12px"><label for="foodName">食べたもの・量</label><textarea id="foodName" rows="2" maxlength="150" placeholder="例：白米150g、鶏むね肉200g">${esc(x.name)}</textarea></div>
  <div class="grid2" style="margin-top:12px"><div class="field"><label for="foodSlot">時間帯</label><select id="foodSlot">${['朝食','昼食','夕食','間食','その他'].map(k=>`<option ${x.slot===k?'selected':''}>${k}</option>`).join('')}</select></div><div class="field"><label for="foodDate">食べた日</label><input type="date" id="foodDate" max="${today}" value="${foodDraft?esc(x.date):foodInputDate()}"></div></div>
  <button class="btn white full" style="margin-top:13px" onclick="estimateFoodUI()">栄養素を概算する</button>
  <div class="food-estimate-note" id="foodEstimateHint">${foodDraft?'栄養情報は修正可能です。':'白米150g・卵2個・牛丼などの一般的な食品を照合します。'}</div>
  <div class="grid2" style="margin-top:10px"><div class="field"><label for="foodK">カロリー（kcal）</label><input type="number" id="foodK" min="0" max="15000" step="1" placeholder="未設定" value="${x.k??''}"></div><div class="field"><label for="foodP">P たんぱく質（g）</label><input type="number" id="foodP" min="0" max="1000" step="0.1" placeholder="未設定" value="${x.p??''}"></div><div class="field"><label for="foodF">F 脂質（g）</label><input type="number" id="foodF" min="0" max="1000" step="0.1" placeholder="未設定" value="${x.f??''}"></div><div class="field"><label for="foodC">C 炭水化物（g）</label><input type="number" id="foodC" min="0" max="1500" step="0.1" placeholder="未設定" value="${x.c??''}"></div></div>
  <div class="note">概算は代表的な食品・一般的な調理法に基づく参考値。油・ソース・商品・外食の量によって大きく変わります。食品表示を優先して修正してください。未対応の料理は数値を手動入力できます。</div>
  <div class="row" style="margin-top:13px"><button class="btn full" onclick="saveFoodUI()">${foodDraft?'変更を保存':'食事記録を保存'}</button>${foodDraft?'<button class="btn gray" onclick="cancelFoodEdit()">中止</button>':''}</div>
 </div>`;
}
function foodHistory(){
 const entries=foodEntries();
 return `<div class="sectionhead"><h2>${prettyDate(foodInputDate())}の食事履歴</h2><span class="badge gray">${entries.length}件</span></div>
 <div class="card" style="margin-top:0">
 ${entries.length?entries.map(x=>`<div class="food-log-entry"><div style="min-width:0;flex:1"><div class="fw">${esc(x.name)}</div><div class="tiny">${esc(x.slot)} ・ ${x.k==null?'栄養未設定':`${x.k} kcal ・ P ${x.p}g / F ${x.f}g / C ${x.c}g`}</div></div><div class="food-actions"><button class="btn gray sm" onclick="editFood('${x.id}')">編集</button><button class="btn gray sm" onclick="deleteFood('${x.id}')">削除</button></div></div>`).join(''):'<p class="small">まだ食べたものを記録していません。上のフォームから追加できます。</p>'}
 </div>`;
}
function foodActualView(){
 return title('実際の食事を記録','提案献立とは別に、食べたものと栄養素を管理。')
 +`<div class="card" style="margin-top:14px"><div class="row"><b>集計する日付</b><input type="date" max="${today}" value="${foodInputDate()}" onchange="foodChangeDate(this.value)" style="max-width:170px;padding:8px;border:1px solid #dde6f2;border-radius:10px;background:white"></div></div>`
 +foodSummary(foodInputDate())+foodForm()+foodHistory()
 +`<div class="note" style="margin-top:13px">食事記録はこの端末のブラウザに保存されます。機種変更時は設定からバックアップを保存してください。</div>`
 +footer();
}
const baseMealsView=mealsView,baseHomeView=homeView;
mealsView=function(){
 const tabs=`<div class="food-tabs"><button class="${foodMode==='actual'?'active':''}" onclick="setFoodMode('actual')">🍴 食べたものを記録</button><button class="${foodMode==='plan'?'active':''}" onclick="setFoodMode('plan')">📋 提案献立を見る</button></div>`;
 const view=foodMode==='actual'?foodActualView():baseMealsView();
 return tabs+view+(foodMode==='plan'?'<div class="notice" style="margin:10px 0">献立は食事の提案です。チェックしても実際の摂取集計には加算されません。食べたものは「食べたものを記録」から登録してください。</div>':'');
};
homeView=function(){
 const html=baseHomeView();
 const anchor='<div class="sectionhead"><h2>今週のトレーニング</h2>';
 return html.replace(anchor,foodSummary(today,true)+anchor);
};
window.setFoodMode=function(v){foodMode=v==='plan'?'plan':'actual';foodDraft=null;render();};
window.foodChangeDate=function(v){if(/^\d{4}-\d{2}-\d{2}$/.test(v)&&v<=today){chosenDate=v;foodDraft=null;render();}};
window.estimateFoodUI=function(){
 const text=$('#foodName')?.value||'',r=estimateFood(text),note=$('#foodEstimateHint');
 if(!text.trim()){notify('食べた料理名を入力してください');return;}
 if(r.ok){for(const [key,id] of [['k','foodK'],['p','foodP'],['f','foodF'],['c','foodC']]){const el=document.getElementById(id);if(el)el.value=r.sum[key];}
  note.textContent='照合: '+r.items.join(' ＋ ')+(r.missing.length?' ／ 未対応: '+r.missing.join('・')+'（不足分は手動で補正）':'')+' ※概算です。';
 }else{note.textContent='該当する食品が見つかりません。パッケージの表示や目安を手入力してください。';}
};
window.saveFoodUI=function(){
 const name=$('#foodName')?.value.trim().slice(0,150)||'',date=$('#foodDate')?.value,slot=$('#foodSlot')?.value||'その他';
 if(!name){notify('食べたものを入力してください');return;}
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>today){notify('食べた日付を確認してください');return;}
 const raw=['foodK','foodP','foodF','foodC'].map(id=>$('#'+id)?.value?.trim()??'');
 let nutrient=null;
 if(raw.some(x=>x!=='')){
  if(raw.some(x=>x==='')){notify('栄養素は4項目すべて入力するか、空欄のまま保存してください');return;}
  nutrient=raw.map((v,i)=>{const n=Number(v);return !Number.isFinite(n)||n<0||n>(i===0?15000:1500)?null:Math.round(n*10)/10;});
  if(nutrient.some(x=>x===null)){notify('栄養素は正しい数値で入力してください');return;}
 }
 ensureFoodState();
 const id=foodDraft?.id||String(Date.now())+'-'+Math.random().toString(36).slice(2,9);
 const entry={id,name,date,slot,k:nutrient?.[0]??null,p:nutrient?.[1]??null,f:nutrient?.[2]??null,c:nutrient?.[3]??null,createdAt:foodDraft?.createdAt||new Date().toISOString()};
 if(foodDraft){state.foodEntries=state.foodEntries.map(x=>x.id===id?entry:x);}else state.foodEntries.push(entry);
 foodDraft=null;chosenDate=date;save();render();notify(nutrient?'食事と栄養素を保存しました':'食事名のみ保存しました。栄養素は後で編集できます');
};
window.editFood=function(id){ensureFoodState();foodDraft=state.foodEntries.find(x=>x.id===id)||null;if(foodDraft){chosenDate=foodDraft.date;render();window.scrollTo({top:0,behavior:'smooth'});}};
window.cancelFoodEdit=function(){foodDraft=null;render()};
window.deleteFood=function(id){if(!window.confirm('この食事記録を削除しますか？'))return;ensureFoodState();state.foodEntries=state.foodEntries.filter(x=>x.id!==id);if(foodDraft?.id===id)foodDraft=null;save();render();notify('食事記録を削除しました')};
const style=document.createElement('style');style.textContent=`
.food-tabs{display:grid;grid-template-columns:1fr 1fr;gap:7px;background:#eaf0f8;padding:5px;border-radius:14px;margin:3px 0 15px}
.food-tabs button{border:0;border-radius:11px;padding:12px 3px;background:transparent;color:#73849b;font-size:12px;font-weight:800}
.food-tabs button.active{background:white;color:#326df6;box-shadow:0 2px 7px #152e5c15}
.food-sum{border:1px solid #dce9ff}
.food-log-entry{display:flex;gap:8px;align-items:center;justify-content:space-between;border-bottom:1px solid #edf1f6;padding:13px 0}
.food-log-entry:first-child{padding-top:2px}.food-log-entry:last-child{padding-bottom:2px;border-bottom:0}
.food-actions{display:flex;gap:4px}
.food-actions .btn{padding:7px 9px;white-space:nowrap}
#foodName{width:100%;font:inherit;color:#17243d;border:1px solid #e3e9f2;border-radius:11px;background:#f8fafd;resize:vertical;min-height:78px;padding:12px;box-sizing:border-box}
.food-estimate-note{border-radius:10px;color:#61738f;background:#f3f7ff;margin-top:9px;padding:10px;font-size:12px}
`;document.head.appendChild(style);
render();
})();