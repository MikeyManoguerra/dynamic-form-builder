import{a as A}from"./chunk-3FBBUYQY.js";import{d as I,e as w,f as N,i as E,l as M,m as V,s as _,t as Q,y as j}from"./chunk-OTCIFY7T.js";import{$b as x,Ka as a,La as g,O as d,S as p,_a as m,aa as f,ab as n,bc as C,eb as l,fb as u,gb as b,jb as h,ka as c,mb as v,nb as y,vb as F,zb as S}from"./chunk-CVXYIMTF.js";function B(e,t){return e.slug.value?e.slug.value:T(e[t].value)}function T(e){return e.toLowerCase().trim().replaceAll(new RegExp(/[^a-z0-9\s]/g),"").replaceAll(new RegExp(/\s{1,}/g),"-")}function D(){return e=>{let t=e.value;if(!t)return null;let s=new RegExp(/^[a-z0-9\-]+$/).test(t),i=t[0]!=="-"&&t.charAt(t.length-1)!=="-";return s?i?null:{dashPattern:!0}:{slugPattern:!0}}}function R(e,t){e&1&&(l(0,"h1",5),F(1,"Create a Form"),u())}function $(e,t){if(e&1&&b(0,"input",6),e&2){let s=y();n("disabled",s.domForm.invalid)}}var Y=(()=>{let t=class t{set disabled(i){this.setFormAvailability(i)}constructor(i){this.formBuilder=i,this.handleSubmit=new d,this.slugQuestion={slug:"slug",label:"Slug",required:!1,type:"text"},this.titleQuestion={slug:"title",label:"Title",required:!0,type:"text"},this.domForm=this.formBuilder.group({slug:["",D()],title:["",I.required]})}ngOnInit(){this.form$.pipe().subscribe(({slug:i,title:o})=>{this.domForm.patchValue({slug:i,title:o}),this.originalSlug=i})}onSubmit(){this.handleSubmit.emit({form:this.domForm.controls,originalSlug:this.originalSlug})}setFormAvailability(i){i?this.domForm.disable():this.domForm.enable()}};t.\u0275fac=function(o){return new(o||t)(g(_))},t.\u0275cmp=p({type:t,selectors:[["form-metadata-form"]],inputs:{form$:"form$",isNew:"isNew",disabled:"disabled"},outputs:{handleSubmit:"handleSubmit"},standalone:!0,features:[S],decls:6,vars:7,consts:[["class","text-2xl font-bold",4,"ngIf"],[3,"formGroup","ngSubmit"],[3,"formControlName","dynamicInput"],[1,"flex","justify-end","pt-5"],["type","submit","class","bg-violet-500 hover:bg-violet-700 text-amber-100 font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:pointer-events-none",3,"disabled",4,"ngIf"],[1,"text-2xl","font-bold"],["type","submit",1,"bg-violet-500","hover:bg-violet-700","text-amber-100","font-bold","py-2","px-4","rounded-full","disabled:opacity-50","disabled:pointer-events-none",3,"disabled"]],template:function(o,r){o&1&&(m(0,R,2,0,"h1",0),l(1,"form",1),v("ngSubmit",function(){return r.onSubmit()}),h(2,2)(3,2),l(4,"div",3),m(5,$,1,1,"input",4),u()()),o&2&&(n("ngIf",r.isNew),a(),n("formGroup",r.domForm),a(),n("formControlName",r.titleQuestion.slug)("dynamicInput",r.titleQuestion),a(),n("formControlName",r.slugQuestion.slug)("dynamicInput",r.slugQuestion),a(2),n("ngIf",!r.domForm.disabled))},dependencies:[C,x,Q,E,w,N,M,V,j],styles:["[_nghost-%COMP%]{display:block;width:100%;max-width:700px;margin-right:auto;margin-left:auto}"]});let e=t;return e})();var et=(()=>{let t=class t{constructor(i){this.toastr=i}notify(i){this.toastr.info(i)}};t.\u0275fac=function(o){return new(o||t)(c(A))},t.\u0275prov=f({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();export{B as a,D as b,Y as c,et as d};