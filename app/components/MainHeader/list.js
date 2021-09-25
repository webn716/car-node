
function filterHeader(cb){
	var oFilterHeader = document.querySelector('#headerFilter');
	var arrHeader = oFilterHeader.querySelectorAll('div');
	for(var i=0,iLen=arrHeader.length;i<iLen;i++){
		arrHeader[i].addEventListener('click',function(){
			for(var j=0,jLen=arrHeader.length;j<jLen;j++){
				arrHeader[j].classList.remove('show-arrow');
			}
			this.classList.add('show-arrow');
			var filterType = this.dataset.filtertype;
			cb && cb(filterType);
		});
	}	
}

module.exports={
	filterHeader:filterHeader
}