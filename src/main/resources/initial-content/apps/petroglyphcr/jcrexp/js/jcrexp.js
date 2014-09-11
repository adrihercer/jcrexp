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
	
	
	$('#jstree_jcr').jstree({
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