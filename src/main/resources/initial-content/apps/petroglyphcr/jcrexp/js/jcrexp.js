$(function () {
    // init layout
    var main_layout = $('.main-container').w2layout({
        name: 'main-container',
        panels: [
            { type: 'top', size: 45, style: 'border: 0px; border-bottom: 1px solid silver; background-color: #fff; color: #555;', overflow: 'hidden'},
            { type: 'left', size: 240, resizable: true, style: 'border-right: 1px solid silver;' },
            { type: 'main', style: 'background-color: white;' }
        ]
    });
	
    w2ui['main-container'].content('top', '<div style="padding: 12px 20px; font-size: 18px;">JCR Sling Explorer</div>');
	w2ui['main-container'].content('left', '<div id="jstree_jcr"></div>');
	w2ui['main-container'].content('main', '<div id="tabs" style="width: 100%;"></div>');
	
	$('#tabs').w2tabs({
        name: 'tabs',
        active: 'search',
        tabs: [
            { id: 'search', caption: 'Search' },
            { id: 'properties', caption: 'Properties' },
            { id: 'content', caption: 'Content' }
        ],
        onClick: function (event) {
        	if (event.target == 'search') {
        		$('#tab-content');
        	} else if (event.target == 'properties') {
        		$('#tab-content');
        	} else if (event.target == 'content') {
        		$('#tab-content');
        	}
    	}
    });
	
	
	$('#jstree_jcr').on('changed.jstree', function (e, data) {
	    /*var i, j, r = [];
	    for(i = 0, j = data.selected.length; i < j; i++) {
	      r.push(data.instance.get_node(data.selected[i]).text);
	    }
	    $('#event_result').html('Selected: ' + r.join(', '));*/
		//console.log('/tools/petroglyphcr/jcrexp.node.info' + data.selected[0]);
		
		$.getJSON('/tools/petroglyphcr/jcrexp.node.info' + data.selected[0], function(data) {
			console.log(data);
		});
	  }).jstree({
		'core' : {
			'data' : {
				'url' : function (node) {
					return '/tools/petroglyphcr/jcrexp.nodes'+(node.id ? node.id : '/')
				}, 
				'data' : function (node) {
					return { 'id' : node.id };
				}
			}
		}
	})
	
});