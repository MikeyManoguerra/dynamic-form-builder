import{a as j}from"./chunk-BKAAPDJS.js";import{a as M}from"./chunk-OTCIFY7T.js";import{e as w,g as D,l as _}from"./chunk-FVNLDTLF.js";import{$b as I,Cb as S,Db as C,J as s,Ka as a,La as r,S as f,_a as d,ab as m,ac as F,bc as E,eb as u,fb as l,gb as v,hb as g,ib as h,n as c,y as p,zb as y}from"./chunk-CVXYIMTF.js";function P(i,e){if(i&1&&(g(0),v(1,"dynamic-form",1),h()),i&2){let A=e.ngIf;a(),m("form",A)}}var b=(()=>{let e=class e{constructor(t,o,n){this.formsStateService=t,this.route=o,this.router=n}ngOnInit(){this.form$=this.route.params.pipe(s(({slug:t})=>this.formsStateService.getForm(t)),p(t=>(this.router.navigate(["/"]),c(()=>new Error(t)))))}};e.\u0275fac=function(o){return new(o||e)(r(_),r(w),r(D))},e.\u0275cmp=f({type:e,selectors:[["form-page"]],standalone:!0,features:[y],decls:3,vars:3,consts:[[4,"ngIf"],[3,"form"]],template:function(o,n){o&1&&(u(0,"default-layout"),d(1,P,2,1,"ng-container",0),S(2,"async"),l()),o&2&&(a(),m("ngIf",C(2,1,n.form$)))},dependencies:[E,I,F,M,j],encapsulation:2});let i=e;return i})();export{b as FormPageComponent};