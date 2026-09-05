export const evaluators={
  'concept-evaluation-scorecard': i=>{const c=i.criteria||[],w=c.reduce((s,x)=>s+Number(x.weight),0),rows=(i.concepts||[]).map(x=>({name:x.name,score:+(c.reduce((s,y)=>s+Number(x.scores?.[y.id]||0)*Number(y.weight),0)/w).toFixed(2)})).sort((a,b)=>b.score-a.score);return{valid:w>0&&rows.length>0,rows,winner:rows[0]?.name||null}},
  'treatment-section-validator': i=>{const missing=(i.required||[]).filter(x=>!String(i.sections?.[x]||'').trim());return{valid:(i.required||[]).length>0&&!missing.length,missing,covered:(i.required||[]).filter(x=>!missing.includes(x))}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
