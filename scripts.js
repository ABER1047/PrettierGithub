//#region variables for element id
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
//#endregion


var current_theme = 0;
var color_table = [ "#0d1117", "#0a0c10", "#ffffff" ];
var text_color_table = [ "#ffffff", "#ffffff", "#000000" ];
var c_w = 0, c_h = 0;
var img_size = "24px", imageMargin = 1, imageAlign = "center";
var icon_buttons_num = 59;
var icon_buttons = [];
var icon_buttons_max_width = 15;
var iconButtonsEvent_activated = false;
var selected_icons_queue = [];
init(); //초기값 설정


themeSelectorButton[0].addEventListener("click",function()
{
    current_theme = 0;
    themeSelected();
});

themeSelectorButton[1].addEventListener("click",function()
{
    current_theme = 1;
    themeSelected();
});

themeSelectorButton[2].addEventListener("click",function()
{
    current_theme = 2;
    themeSelected();
});


function themeSelected()
{
    document.documentElement.style.setProperty("--SelectedColorText_xx",c_w*(0.95-current_theme*0.03)-5+"px");
    mainBackground.style.background = color_table[current_theme];
    textBoxBG.style.background = color_table[current_theme];
    textBoxBG.style.color = text_color_table[current_theme];
    underBarEffectText.style.color = text_color_table[current_theme];
    codeOutput.style.color = text_color_table[current_theme];
    ImageSizeValueText.style.color = text_color_table[current_theme];
    marginSelectorValueText.style.color = text_color_table[current_theme];
    marginSelectorText.style.color = text_color_table[current_theme];
    ImageSizeText.style.color = text_color_table[current_theme];
    alignSelectorText.style.color = text_color_table[current_theme];
    alignSelectorValueText.style.color = text_color_table[current_theme];
}

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

//imgSizeSelector button
imgSizeSelector.addEventListener("input",function()
{
    var tmp_value = (imgSizeSelector.value)+"px";
    img_size = tmp_value;
    ImageSizeValueText.innerHTML = tmp_value;
    
    loadDesign();
})


//underBarEffectCheckBox
underBarEffectCheckBox.addEventListener("click",function()
{
    loadDesign();
})


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



function stepEvent()
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
    
    setTimeout(stepEvent,100);
}


function iconButtonsEvent(evt)
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

function iconButtonsClickEvent(evt)
{
    var i = evt.currentTarget.param0;
    var tmp_ins = icon_buttons[i];

    if (tmp_ins.style.filter != "")
    {
        tmp_ins.style.filter = "";
        var index = selected_icons_queue.indexOf(i);
        selected_icons_queue.splice(index, 1);
        tmp_ins.style.opacity = 1;
    }
    else
    {
        tmp_ins.style.opacity = 0.6;
        tmp_ins.style.filter = "drop-shadow(2px 0 0px white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0px white) drop-shadow(0 -2px 0 white)";
        selected_icons_queue.push(i);
    }
    
    loadDesign();
    console.log(selected_icons_queue);
}

function loadDesign()
{
    console.log(underBarEffectCheckBox.value);
    
    //선택된 아이콘들 그리기
    var tmp_output = "<div align='"+(imageAlign)+"'>";
    for(var k = 0; k < selected_icons_queue.length; k++)
    {
        if (underBarEffectCheckBox.checked)
        {
            tmp_output += "<code>"
        }
        tmp_output += "<img src='imgs/"+(selected_icons_queue[k])+".png'style='width:"+(img_size)+"'>";
        if (underBarEffectCheckBox.checked)
        {
            tmp_output += "</code>"
        }
        
        for (var kk = 0; kk < imageMargin; kk++)
        {
            tmp_output += "&nbsp";
        }
    }
    tmp_output += "</div>";
    
    innerBox.innerHTML = tmp_output;
    if (selected_icons_queue.length > 0)
    {
        codeOutput.innerText = "Copy & Paste below code!\n\n"+tmp_output;
    }
    else
    {
        codeOutput.innerText = "";
    }
    console.log(tmp_output);
}