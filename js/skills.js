/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Progress Bars
5. Init Loaders


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var menu = $('.menu');
	var burger = $('.hamburger');
	var menuActive = false;
	var ctrl = new ScrollMagic.Controller();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

		if(window.innerWidth > 1280)
		{
			if(menuActive)
			{
				closeMenu();
			}
		}
		setTimeout(function()
		{
			jQuery(".main_content_scroll").mCustomScrollbar("update");
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initLoaders();
	initProgressBars();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.hamburger').length && $('.menu').length)
		{
			var hamb = $('.hamburger');

			hamb.on('click', function()
			{
				if(!menuActive)
				{
					openMenu();
				}
				else
				{
					closeMenu();
				}
			});
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	4. Init Progress Bars

	*/

	function initProgressBars()
	{
		if($('.skill_bars').length)
		{
			var eles = $('.skill_bars');
			var gradNum = 0;

			eles.each(function(i)
			{

				var ele = $(this);
	    		var elePerc = ele.data('perc');
	    		var eleName = '#'+ele.data('name');
	    		var eleColorStart = ele.data('color-start');
	    		var eleColorEnd = ele.data('color-end');
	    		var eleGradient = 'url(#gradient' + gradNum.toString() +')';
	    		let linearGradient = '<defs><linearGradient id="gradient' + gradNum + '" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse"><stop offset="20%" stop-color="'+ eleColorStart +'"/><stop offset="50%" stop-color="'+ eleColorEnd+'"/></linearGradient></defs>';
	    		
	    		var statsScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var pbar = new ProgressBar.Line(eleName, 
		    		{
		    			strokeWidth: 1,
						easing: 'bounce',
						duration: 2500,
						color: eleGradient,
						trailColor: '#ffffff',
						trailWidth: 1,
						svgStyle: {width: '100%', height: '100%'},
						text: {
							style: {
								position: 'absolute',
								right: '0',
								top: '-20px',
								padding: 0,
								margin: 0,
								transform: null
								},
								autoStyleContainer: false
						},
						step: (state, bar) => {
						bar.setText(Math.round(bar.value() * 100) + ' %');
						}
		    		});
		    		pbar.animate(elePerc);
					pbar.svg.insertAdjacentHTML('afterBegin', linearGradient);
		    	})
		    	.addTo(ctrl);
		    	gradNum++;
			});
		}	
	}

	/* 

	5. Initialize Milestones

	*/

	function initLoaders()
	{
		if($('.loader').length)
		{
			var loaders = $('.loader');

			loaders.each(function()
			{
				var loader = this;
				var endValue = $(loader).data('perc');

				var loaderScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var cbar = new ProgressBar.Circle(loader,
					{
						color: '#8583e1',
						// This has to be the same size as the maximum width to
						// prevent clipping
						strokeWidth: 1,
						trailWidth: 10,
						trailColor: '#e5e6e8',
						easing: 'bounce',
						duration: 2500,
						text:
						{
							autoStyleContainer: false
						},
						from:{ color: '#8583e1', width: 1 },
						to: { color: '#8583e1', width: 1 },
						// Set default step function for all animate calls
						step: function(state, circle)
						{
							circle.path.setAttribute('stroke', state.color);
							circle.path.setAttribute('stroke-width', state.width);

							var value = Math.round(circle.value() * 100);
							if (value === 0)
							{
								circle.setText('0%');
							}
							else
							{
								circle.setText(value + "%");
							}
						}
					});
					cbar.text.style.fontFamily = '"Montserrat", sans-serif';
					cbar.text.style.fontSize = '44px';
					cbar.text.style.fontWeight = '700';
					cbar.text.style.color = "#100f3a";


					cbar.animate(endValue);  // Number from 0.0 to 1.0
		    	})
			    .addTo(ctrl);
			});
		}
	}

});