
var XLScroll = function(args) {
	var cont = $(args.container) ;
	var singles = cont.getElementsByTagName("li") ;
	this.maxlength = singles.length ;
	this.pershow = args.pershow ;
	this.switch_data = singles ;
	this.control_pre = args.control_pre ;
	this.control_next = args.control_next ;
	this.objname = args.objname ;
	if (args.control_show) {
		this.control_show_elm = args.control_show.elm ;
		this.control_show_selectedstyle = args.control_show.selected_style ;
	}
}
XLScroll.prototype.scroll_switch = function(obj,page) {
	var maxpage = parseInt(this.maxlength / this.pershow) ;
	if (page < 1) {page = maxpage ;}
	if (page > maxpage) { page = 1 ;}
	$(this.control_pre).onclick = function() {obj.scroll_switch(obj,page - 1)} ;
	$(this.control_next).onclick = function() {obj.scroll_switch(obj,page + 1)} ;

	if (this.control_show_elm && this.control_show_selectedstyle) {
		$(this.control_show_elm).innerHTML = "" ;
		for (i=1;i<=maxpage;i++) {
			var showli = document.createElement("li") ;
			showli.innerHTML = '<a href="javascript://"></a>' ;
			showli.onclick = new Function(obj.objname+".scroll_switch("+obj.objname+","+i+");") ;  // dasdasd
			if (i == page) {
				showli.className = this.control_show_selectedstyle ;
			}
			$(this.control_show_elm).appendChild(showli) ;
		}
	}

	for (i=0;i<this.maxlength;i++) {
		if ( i >= ((page-1)*(this.pershow)) && i <= (page*this.pershow - 1) ) {
			this.switch_data[i].style.display = "block" ;
		}
		else {
			this.switch_data[i].style.display = "none" ;
		}
	}
}
var SwitchPic = function(args) {
	this.bigpiccont = $(args.bigpic) ;
	this.switchnav = $(args.switchnav) ;
	this.selectstyle = args.selectstyle ;
	this.objname = args.objname ;
	this.curpage = 0 ;
	this.autotimeintval = 3000 ;
	var bigpics = $(this.bigpiccont).getElementsByTagName("div") ;
	this.totalcount = bigpics.length ;
	//this.bigpics = bigpics ;
	
	for (i=0;i<bigpics.length;i++) {
		bigpics[i].onmouseover = new Function(this.objname+".pauseSwitch();") ;
		bigpics[i].onmouseout = new Function(this.objname+".goonSwitch("+this.objname+");") ;
	}
	
	var switchnavs = $(this.switchnav).getElementsByTagName("li") ;
	for (i=0;i<switchnavs.length;i++) {
		switchnavs[i].onmouseover = new Function(this.objname+".goSwitch("+this.objname+","+i+");"+this.objname+".pauseSwitch();") ;
		switchnavs[i].onmouseout = new Function(this.objname+".goonSwitch("+this.objname+");") ;
	}

}
SwitchPic.prototype.goSwitch = function(obj,page) {
	if (page >= this.totalcount) { page = 0 ;}
	this.curpage = page ;
	
	var bigpics = $(this.bigpiccont).getElementsByTagName("div") ;
	for (i=0;i<bigpics.length;i++) {
		if (i == page) {bigpics[i].style.display = "block" ;}
		else {bigpics[i].style.display = "none" ;}
	}
	var switchnavs = $(this.switchnav).getElementsByTagName("li") ;
	for (i=0;i<switchnavs.length;i++) {
		if (i == page) {Element.addClassName(switchnavs[i], this.selectstyle); }
		else { Element.removeClassName(switchnavs[i],this.selectstyle); }
	}
}
SwitchPic.prototype.autoSwitch = function(obj) {
	this.curpage ++ ;
	this.goSwitch(obj,this.curpage) ;
	this.autoSwitchTimer = setTimeout(obj.objname+".autoSwitch("+obj.objname+");", this.autotimeintval);
}
SwitchPic.prototype.pauseSwitch = function() {
	clearTimeout(this.autoSwitchTimer);
}
SwitchPic.prototype.goonSwitch = function(obj) {
	clearTimeout(this.autoSwitchTimer);
	this.autoSwitchTimer = setTimeout(obj.objname+".autoSwitch("+obj.objname+");", this.autotimeintval);
}
