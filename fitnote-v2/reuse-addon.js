(function fitnoteReuseAddon(){
'use strict';
if(window.__fitnoteReuseAddon)return;window.__fitnoteReuseAddon=true;
if(!Array.isArray(state.foodFavorites))state.foodFavorites=[];
let recentShown=[],favoriteShown=[],editId=null,photoDraft=null,photoChanged=false,renderVersion=0;
const oldRender=render,oldEdit=window.editFood,oldCancel=window.cancelFoodEdit,oldSave=window.saveFoodUI,oldSetMode=window.setFoodMode;
const findPhoto=id=>state.foodEntries?.find(x=>x.id===id)?.photo||null;
function pickList(){
 const arr=Array.isArray(state.foodEntries)?[...state.foodEntries].sort((a,b)=>String(b.createdAt||b.id).localeCompare(String(a.createdAt||a.id))):[];
 const seen=new Set();recentShown=[];
 for(const x of arr){const sig=[x.name,x.k,x.p,x.f,x.c].join('|');if(!seen.has(sig)){recentShown.push(x);seen.add(sig);}if(recentShown.length>=8)break;}
 favoriteShown=state.foodFavorites;
}
function listRows(xs,source){
 if(!xs.length)return '<div class="tiny" style="padding:10px 0">まだありません。食事履歴の☆を押すと登録できます。</div>';
 return xs.map((e,i)=>`<div class="fit-reuse-row">
 <div style="flex:1;min-width:0"><b>${esc(e.name)}</b><div class="tiny">${esc(e.slot||'')} ・ ${e.k==null?'栄養未設定':`${e.k} kcal / P ${e.p}g / F ${e.f}g / C ${e.c}g`}</div></div>
 <button type="button" class="btn white sm" onclick="reuseFood(${i},'${source}')">＋ 記録</button>
 ${source==='favorites'?`<button type="button" class="btn gray sm" onclick="unfavoriteFood(${i})" aria-label="お気に入りから解除">★</button>`:''}
 </div>`).join('');
}
function reuseHTML(){
 pickList();
 return `<div class="card" style="margin-top:13px"><div class="row"><b>⭐ 保存済みの食事</b><span class="badge gray">再利用</span></div>
 <div class="tiny" style="margin:8px 0 14px">食事をタップするだけで、選択中の日付に同じ料理と栄養値をもう一度記録できます。</div>
 <div class="fw" style="font-size:12px">お気に入り</div>${listRows(favoriteShown,'favorites')}<div class="line"></div>
 <div class="fw" style="font-size:12px">最近食べたもの</div>${listRows(recentShown,'recent')}</div>`;
}
function insertReuse(){
 const el=document.getElementById('foodName');if(!el)return;
 const host=el.closest('.card');if(!host||document.getElementById('fitReuseSection'))return;
 const section=document.createElement('div');section.id='fitReuseSection';section.innerHTML=reuseHTML();host.before(section);
 const entries=document.querySelectorAll('.food-log-entry');
 entries.forEach(row=>{
  const btn=row.querySelector('.food-actions button');if(!btn)return;
  const pos=[...document.querySelectorAll('.food-log-entry')].indexOf(row);
  const days=state.foodEntries.filter(x=>x.date===(chosenDate>today?today:chosenDate)).sort((a,b)=>String(b.createdAt||b.id).localeCompare(String(a.createdAt||a.id)));
  const item=days[pos];if(!item)return;
  const c=document.createElement('button');c.className='btn white sm';c.textContent='＋再記録';c.type='button';c.addEventListener('click',()=>window.reuseFoodById(item.id));
  const f=document.createElement('button');f.className='btn gray sm';f.type='button';f.textContent=state.foodFavorites.some(x=>x.name===item.name&&x.k===item.k&&x.p===item.p&&x.f===item.f&&x.c===item.c)?'★':'☆';
  f.setAttribute('aria-label','お気に入り切り替え');f.addEventListener('click',()=>window.toggleFoodFav(item.id));
  btn.parentElement.insertBefore(f,btn);btn.parentElement.insertBefore(c,btn);
 });
}
function photoUI(){
 const input=document.getElementById('foodName');if(!input||document.getElementById('fitPhotoControl'))return;
 const block=document.createElement('div');block.id='fitPhotoControl';
 block.innerHTML=`<div class="field" style="margin:11px 0"><label for="fitFoodPhoto">写真を付ける（任意）</label><input id="fitFoodPhoto" type="file" accept="image/*" style="max-width:100%"></div><div id="fitPhotoPreview"></div><div class="tiny">写真はこの端末に縮小して保存します。写真から栄養素をAI自動判定する機能はまだありません。</div>`;
 input.parentElement.after(block);
 document.getElementById('fitFoodPhoto').addEventListener('change',e=>window.attachFoodPhoto(e.target.files?.[0]));
 drawPhoto();
 const examples=document.createElement('div');examples.className='fit-example';examples.innerHTML='<div class="tiny" style="margin-bottom:6px">外食・コンビニの入力例（概算）</div>';
 const row=document.createElement('div');row.className='fit-example-row';examples.append(row);
 ['牛丼','鮭定食','ラーメン','カレーライス','唐揚げ弁当','おにぎり','ハンバーガー','サラダチキン','パスタ'].forEach(food=>{
  let b=document.createElement('button');b.type='button';b.textContent=food;b.onclick=()=>{input.value=food;['foodK','foodP','foodF','foodC'].forEach(i=>{let x=document.getElementById(i);if(x)x.value=''});window.estimateFoodUI()};row.append(b);
 });
 block.before(examples);
}
function drawPhoto(){
 const area=document.getElementById('fitPhotoPreview');if(!area)return;area.replaceChildren();
 if(!photoDraft)return;
 const img=document.createElement('img');img.src=photoDraft;img.alt='添付した食事の写真';img.style.cssText='width:110px;height:95px;object-fit:cover;border-radius:12px;display:block;margin:7px 0';area.append(img);
 const btn=document.createElement('button');btn.className='btn gray sm';btn.textContent='写真を外す';btn.onclick=()=>{photoDraft=null;photoChanged=true;drawPhoto()};area.append(btn);
}
window.attachFoodPhoto=async function(file){
 if(!file)return;if(!file.type.startsWith('image/'))return notify('画像ファイルを選んでください');if(file.size>8*1024*1024)return notify('写真は8MB以下を選んでください');
 let url=URL.createObjectURL(file),img=new Image();
 img.onload=()=>{try{const factor=Math.min(1,360/Math.max(img.naturalWidth,img.naturalHeight)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*factor));canvas.height=Math.max(1,Math.round(img.naturalHeight*factor));canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);photoDraft=canvas.toDataURL('image/jpeg',.55);photoChanged=true;drawPhoto();notify('写真を添付しました');}catch(e){notify('写真を処理できませんでした')}finally{URL.revokeObjectURL(url)}};
 img.onerror=()=>{URL.revokeObjectURL(url);notify('画像を読み込めませんでした')};img.src=url;
};
window.reuseFoodById=function(id){
 const src=state.foodEntries?.find(x=>x.id===id);if(!src)return notify('食事記録が見つかりません');repeat(src);
};
function repeat(src){
 const date=chosenDate>today?today:chosenDate;
 state.foodEntries??=[];
 state.foodEntries.push({id:Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,9),name:src.name,date,slot:src.slot||'その他',k:src.k??null,p:src.p??null,f:src.f??null,c:src.c??null,createdAt:new Date().toISOString(),photo:null});
 save();render();notify('「'+src.name+'」を再記録しました');
}
window.reuseFood=function(i,type){let arr=type==='favorites'?favoriteShown:recentShown;if(arr[i])repeat(arr[i])};
window.unfavoriteFood=function(i){let x=favoriteShown[i];if(!x)return;state.foodFavorites=state.foodFavorites.filter(t=>t.id!==x.id);save();render();notify('お気に入りを解除しました')};
window.toggleFoodFav=function(id){
 let x=state.foodEntries?.find(t=>t.id===id);if(!x)return;state.foodFavorites??=[];
 const p=state.foodFavorites.findIndex(a=>a.name===x.name&&a.k===x.k&&a.p===x.p&&a.f===x.f&&a.c===x.c);
 if(p>=0){state.foodFavorites.splice(p,1);notify('お気に入りを解除しました')}else{state.foodFavorites.unshift({id:'fav_'+Date.now().toString(36),name:x.name,slot:x.slot,k:x.k,p:x.p,f:x.f,c:x.c});notify('お気に入りに登録しました')}
 save();render();
};
render=function(){renderVersion++;oldRender();if(page==='meals'){insertReuse();photoUI();}};
window.editFood=function(id){editId=id;photoDraft=findPhoto(id);photoChanged=false;oldEdit(id)};
window.cancelFoodEdit=function(){editId=null;photoDraft=null;photoChanged=false;oldCancel()};
window.setFoodMode=function(v){editId=null;photoDraft=null;photoChanged=false;oldSetMode(v)};
window.saveFoodUI=function(){
 const name=document.getElementById('foodName')?.value.trim(),date=document.getElementById('foodDate')?.value,ver=renderVersion;
 oldSave();
 if(renderVersion===ver)return;
 const entry=editId?state.foodEntries.find(x=>x.id===editId):[...state.foodEntries].reverse().find(x=>x.name===name&&x.date===date);
 if(entry&&(photoChanged||(!editId&&photoDraft))){entry.photo=photoDraft;save();render();}
 editId=null;photoDraft=null;photoChanged=false;
};
const css=document.createElement('style');css.textContent=`
.fit-reuse-row{display:flex;gap:7px;align-items:center;border-bottom:1px solid #e8eef7;padding:10px 0}.fit-reuse-row:last-child{border:0}.fit-reuse-row b{font-size:12px}
.fit-reuse-row button,.food-actions button{white-space:nowrap;padding:7px 8px}.food-actions{flex-wrap:wrap;justify-content:flex-end}.fit-example-row{display:flex;flex-wrap:wrap;gap:5px}.fit-example-row button{border:1px solid #d5e2fa;border-radius:100px;background:#f1f6ff;color:#3562aa;font-size:11px;padding:7px 10px}.fit-example{padding:11px 0 0}`;
document.head.append(css);render();
})();