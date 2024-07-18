//#region element저장용 변수
var themeSelectorButton = [];
for(var i = 0; i < 3; i++)
{
    themeSelectorButton[i] = document.getElementById("themeSelectorButton"+i);
}
var mainBackground = document.getElementById("mainBackground");
var textBoxBG = document.getElementById("textBoxBG");
var SelectedColorText = document.getElementById("SelectedColorText");
var ImageSizeValueText = document.getElementById("ImageSizeValueText");
var iconButtonsParents = document.getElementById("iconButtonsParents");
var innerBox = document.getElementById("innerBox");
var imgSizeSelector = document.getElementById("imgSizeSelector");
var underBarEffectCheckBox = document.getElementById("underBarEffectCheckBox");
var marginValueText = document.getElementById("marginValueText");
var marginSelector = document.getElementById("marginSelector");
var underBarEffectText = document.getElementById("underBarEffectText");
var marginSelectorText = document.getElementById("marginSelectorText");
var ImageSizeText = document.getElementById("ImageSizeText");
var alignSelectorText = document.getElementById("alignSelectorText");
var alignSelectorValueText = document.getElementById("alignSelectorValueText");
var alignSelector = document.getElementById("alignSelector");
var codeOutputTitle = document.getElementById("codeOutputTitle");
var menuIcon = document.getElementById("menuIcon");
var textBoxBGText = document.getElementById("textBoxBGText");
var outerBoxCheckBox = document.getElementById("outerBoxCheckBox");
var closeButton = document.getElementById("closeButton");
var addHyperlinkButton = document.getElementById("addHyperlinkButton");
var hyperlinkWindow = document.getElementById("hyperlinkWindow");
var linkInput = document.getElementById("linkInput");
var addTextButton = document.getElementById("addTextButton");
var resetButton = document.getElementById("resetButton");
//#endregion


//#region 초기 변수 선언
var current_theme = 0;
var color_table = [ "#0d1117", "#0a0c10", "#ffffff" ];
var subBG_color_table = [ "#010409", "#010409", "#f6f8fa" ];
var c_w = 0, c_h = 0;
var img_size = 24, imageMargin = 1, imageAlign = "center";
var icon_buttons_num = 82;
var icon_buttons = [];
var icon_buttons_max_width = 15;
var iconButtonsEvent_activated = false;
var selected_icons_queue = [];
var selected_icons_link_queue = [];
var text_queue = [];
var hyperlinkWindow_opened = false, force_run = false, windowType = 0;
init(); //초기값 설정
//#endregion


//#region 버튼 클릭 관련 함수


//하이퍼링크 추가 윈도우
addHyperlinkButton.addEventListener('click', function() 
{
    var tmp_input = linkInput.value;
    tmp_input = (tmp_input == undefined) ? "" : tmp_input;
    switch(windowType)
    {
        //하이퍼링크 추가 윈도우
        case 0:
            selected_icons_link_queue.push((tmp_input == "") ? "https://rebrand.ly/e1d8xfm" : tmp_input);
        break;
        
        //텍스트 추가 윈도우
        case 1:
            text_queue.push((tmp_input != "") ? tmp_input : " ");
            console.log("tmp_input : "+tmp_input);
            console.log(text_queue);
        break;
    }
    openAndCloseHyperlinkWindow(true);
    setTimeout(loadDesign,150);
});

//텍스트 추가 버튼
addTextButton.addEventListener('click', function() 
{
    if (!hyperlinkWindow_opened)
    {
        windowType = 1;
        selected_icons_queue.push(-4);
        openAndCloseHyperlinkWindow(false);
        setTimeout(loadDesign,150);
    }
});

//리셋 버튼
resetButton.addEventListener('click', function() 
{
    if (!hyperlinkWindow_opened)
    {
        window.location.reload();
    }
});


//설정 창
function openAndCloseHyperlinkWindow(argument0)
{
    linkInput.value = "";
    switch(windowType)
    {
        //하이퍼링크 추가 윈도우
        case 0:
            addHyperlinkButton.innerHTML = "Add hyperlink on icon";
            linkInput.placeholder = "https://github.com/ABER1047/PrettierGithub";
        break;
        
        //텍스트 추가 윈도우
        case 1:
            addHyperlinkButton.innerHTML = "Add text";
            linkInput.placeholder = "Enter text here";
        break;
    }
    
    if (argument0 != true && argument0 != false)
    {
        argument0 = hyperlinkWindow_opened;
    }
    hyperlinkWindow.style.opacity = (argument0) ? 0 : 1;
    setTimeout(HyperlinkWindowAnimation1,90,argument0);
    setTimeout(HyperlinkWindowAnimation2,150,argument0);
}

function HyperlinkWindowAnimation1(argument0)
{
    hyperlinkWindow_opened = !argument0;
}

function HyperlinkWindowAnimation2(argument0)
{
    hyperlinkWindow.style.top = (argument0) ? "-999px" : "420px";
}

closeButton.addEventListener('click', function()
{
    switch(windowType)
    {
        //하이퍼링크 추가 윈도우
        case 0:
            selected_icons_link_queue.push(-4);
        break;
        
        //텍스트 추가 윈도우
        case 1:
            selected_icons_queue.pop();
        break;
    }
    openAndCloseHyperlinkWindow();
});





themeSelectorButton[0].addEventListener("click",function()
{
    if (!hyperlinkWindow_opened)
    {
        current_theme = 0;
        themeSelected();
    }
});

themeSelectorButton[1].addEventListener("click",function()
{
    if (!hyperlinkWindow_opened)
    {
        current_theme = 1;
        themeSelected();
    }
});

themeSelectorButton[2].addEventListener("click",function()
{
    if (!hyperlinkWindow_opened)
    {
        current_theme = 2;
        themeSelected();
    }
});


function themeSelected()
{
    document.documentElement.style.setProperty("--SelectedColorText_xx",c_w*(0.95-current_theme*0.03)-5+"px");
    mainBackground.style.background = color_table[current_theme];
    textBoxBG.style.background = color_table[current_theme];
    subBackground.style.background = subBG_color_table[current_theme];
    menuIcon.style.background = subBG_color_table[current_theme];
    if (outerBoxCheckBox.checked)
    {
        document.getElementById("outerBox").style.background = color_table[current_theme];
    }
}


//imgSizeSelector button
imgSizeSelector.addEventListener("input",function()
{
    img_size = (imgSizeSelector.value)*1.0;
    ImageSizeValueText.innerHTML = (img_size)+"px";
    
    loadDesign();
})


//underBarEffectCheckBox
underBarEffectCheckBox.addEventListener("click",loadDesign);


//outerBoxCheckBox
outerBoxCheckBox.addEventListener("click",loadDesign);


//클립보드로 코드 복사
codeOutput.addEventListener("click",function()
{
    navigator.clipboard.writeText(codeOutput.str_real);
    codeOutputTitle.innerHTML = "Copied on clipboard✅</br></br></br>";
    codeOutput.style.transition = "opacity 0s";
    codeOutput.style.opacity = 0.5;
    setTimeout(clipboard_animation1,100);
})

function clipboard_animation1()
{
    codeOutput.style.transition = "opacity 0.5s";
    setTimeout(clipboard_animation2,100);
}

function clipboard_animation2()
{
    codeOutput.style.opacity = 1;
}





//alignSelector
alignSelector.addEventListener("input",function()
{
    var tmp_value = (alignSelector.value);
    switch(tmp_value)
    {
        case "-1":
            imageAlign = "left";
        break;
        case "0":
            
            imageAlign = "center";
        break;
        
        case "1":
            imageAlign = "right";
        break;
    }
    console.log(tmp_value);
    alignSelectorValueText.innerHTML = imageAlign;
    loadDesign();
})

//marginSelector 
marginSelector.addEventListener("input",function()
{
    var tmp_value = (marginSelector.value);
    imageMargin = tmp_value;
    marginSelectorValueText.innerHTML = tmp_value;
    
    loadDesign();
})


function iconButtonsEvent(evt)
{
    if (!hyperlinkWindow_opened)
    {
        var i = evt.currentTarget.param0;
        var tmp_ins = icon_buttons[i];

        if (tmp_ins.style.opacity == 0.6)
        {
            tmp_ins.style.opacity = 1;
        }
        else
        {
            tmp_ins.style.opacity = 0.6;
        }
    }
}

function iconButtonsClickEvent(evt)
{
    if (!hyperlinkWindow_opened)
    {
        var i = evt.currentTarget.param0;
        var tmp_ins = icon_buttons[i];

        if (tmp_ins.style.filter != "")
        {
            tmp_ins.style.filter = "";
            var index = selected_icons_queue.indexOf(i);
            selected_icons_queue.splice(index, 1);
            selected_icons_link_queue.splice(index, 1);
            tmp_ins.style.opacity = 1;
        }
        else
        {
            tmp_ins.style.opacity = 0.6;
            tmp_ins.style.filter = "drop-shadow(2px 0 0px white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0px white) drop-shadow(0 -2px 0 white)";
            selected_icons_queue.push(i);
            
            windowType = 0;
            openAndCloseHyperlinkWindow(false);
        }
        
        loadDesign();
        console.log(selected_icons_queue);
    }
}
//#endregion



//#region 설정된 디자인 불러오기
function loadDesign()
{
    if (!hyperlinkWindow_opened)
    {
        console.log(underBarEffectCheckBox.value);
        
        //선택된 아이콘들 그리기
        var tmp_todraw_output = ((outerBoxCheckBox.checked) ? "<div align='center'>" : "<div align='"+(imageAlign)+"'>");
        var tmp_output = ((outerBoxCheckBox.checked) ? "<div align='"+(imageAlign)+"'>\n\n|" : "")+tmp_todraw_output;
        var tmp_index = 0;
        for(var k = 0; k < selected_icons_queue.length; k++)
        {
            if (underBarEffectCheckBox.checked)
            {
                tmp_output += "<code>"
            }
            
            console.log(selected_icons_link_queue);
            var tmp_str = ""
            if (selected_icons_queue[k] != -4)
            { 
                tmp_str = "<img width='"+(img_size)+"px' src='https://github.com/ABER1047/PrettierGithub/raw/main/imgs/"+(selected_icons_queue[k])+".png'>" 
            }
            else
            {
                if (text_queue[tmp_index] == "")
                {
                    tmp_str = "</br></br>";
                }
                else
                {
                    tmp_str = "<a>\n\n### "+(text_queue[tmp_index])+"\n\n</a>";
                    tmp_index ++;
                }
            }
            if (selected_icons_link_queue[tmp_index] == -4 || selected_icons_link_queue[tmp_index] == undefined)
            {
                tmp_output += (tmp_str);
            }
            else
            {
                tmp_output += "<a href='"+(selected_icons_link_queue[tmp_index])+"'>"+(tmp_str)+"</a>";
            }
            
            
            if (underBarEffectCheckBox.checked)
            {
                tmp_output += "</code>"
            }
            
            for (var kk = 0; (k != selected_icons_queue.length-1 && kk < imageMargin); kk++)
            {
                tmp_output += "&nbsp;";
            }
        }
        tmp_output += "</div>";
        tmp_todraw_output += tmp_output;

        
        innerBox.innerHTML = tmp_todraw_output.replace("|","");
        
        if (outerBoxCheckBox.checked)
        {
            var tmp_width = ((img_size + 6*(marginSelector.value))*selected_icons_queue.length);
            if (tmp_width > 850)
            {
                tmp_width = 850;
            }
            tmp_output += "|\n|--|\n</div>";
            innerBox.innerHTML = "<div id = 'outerBox' class = 'outerBox' style = 'width : "+(tmp_width)+"px; padding : 6px;'>"+(innerBox.innerHTML)+"</div>";
            innerBox.innerHTML = "<div class = 'alignSetter' align = "+(imageAlign)+">"+(innerBox.innerHTML)+"</div>";
        }
        
        
        if (selected_icons_queue.length > 0)
        {
            codeOutputTitle.innerHTML = "Copy & Paste below code!</br></br></br>";
            codeOutput.innerText = (tmp_output.length > 240) ? tmp_output.substring(0,240)+"..." : tmp_output;
            codeOutput.str_real = tmp_output;
        }
        else
        {
            codeOutputTitle.innerHTML = "";
            codeOutput.innerText = "";
        }
        textBoxBGText.style.textAlign = imageAlign;
        console.log(tmp_output);
    }
}
//#endregion




//#region 시스템 함수
function init()
{
    c_w = window.innerWidth;
    c_h = window.innerHeight;
    themeSelected();
    
    
    //아이콘 생성 버튼 생성
    for(var i = 0; i <= icon_buttons_num; i++)
    {
        icon_buttons[i] = document.createElement("img");
        icon_buttons[i].style.top = (c_h*0.2 + floor(i/icon_buttons_max_width)*42)+"px";
        icon_buttons[i].src = "imgs/"+(i)+".png";
        icon_buttons[i].style.position = "fixed";
        icon_buttons[i].style.width = "24px";
        icon_buttons[i].style.left = (c_w*0.6 + (i%icon_buttons_max_width)*48)+"px";
        icon_buttons[i].style.opacity = 0.6;
        icon_buttons[i].style.zIndex = 320;
        icon_buttons[i].style.transition = "opacity ease 0.2s, filter ease 0.2s";
        icon_buttons[i].id = "icon_buttons_"+(i);
        iconButtonsParents.appendChild(icon_buttons[i]);
    }
    
    stepEvent();
}

//스탭 이벤트
function stepEvent()
{
    if (!hyperlinkWindow_opened)
    {
        iconButtonsEvent_activated = false;
        for(var i = 0; i <= icon_buttons_num; i++)
        {
            icon_buttons[i].addEventListener("click",iconButtonsClickEvent);
            icon_buttons[i].param0 = i;
            
            icon_buttons[i].addEventListener("mouseover",iconButtonsEvent);
            icon_buttons[i].param0 = i;
            
            icon_buttons[i].addEventListener("mouseleave",iconButtonsEvent);
            icon_buttons[i].param0 = i;
        }
    }
    setTimeout(stepEvent,100);
}

//#endregion