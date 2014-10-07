/**
	Rotated column header demo widget
	========================

	@file      : RotatedColumnHeaderDemoWidget.js
	@version   : 1.0
	@author    : ...
	@date      : 07-10-2014
	@copyright : Synobsys
	@license   : Apache License, Version 2.0, January 2004

	Documentation
	=============
	This widget shows an example using the generated CSS. Used in the pivot table demo project

*/
dojo.provide('RotatedColumnHeaderDemoWidget.widget.RotatedColumnHeaderDemoWidget');

dojo.declare('RotatedColumnHeaderDemoWidget.widget.RotatedColumnHeaderDemoWidget', [ mxui.widget._WidgetBase, mxui.mixin._Contextable ], {

	/**
	 * Internal variables.
	 * ======================
	 */
	_contextGuid			: null,
	_contextObj				: null,
    _handle                 : null,

	// Extra variables

	/**
	 * Mendix Widget methods.
	 * ======================
	 */

	// DOJO.WidgetBase -> PostCreate is fired after the properties of the widget are set.
	postCreate: function () {
		'use strict';

        // postCreate

		// Load CSS ... automaticly from ui directory

		// Setup widgets
		this._setupWidget();

	},

    // DOJO.WidgetBase -> Startup is fired after the properties of the widget are set.
    startup: function () {
        'use strict';

        // Example setting message

    },

	/**
	 * What to do when data is loaded?
	 */

	update : function (obj, callback) {
		'use strict';

        if (this._handle) {
            mx.data.unsubscribe(this._handle);
        }

        this._contextObj = obj;

		if (obj === null) {
			// Sorry no data no show!
			console.log('RotatedColumnHeaderDemoWidget  - update - We did not get any context object!');
		} else {
			// Load data
			console.log('RotatedColumnHeaderDemoWidget  - update - Load the data');
			this._loadData();
            this._handle = mx.data.subscribe({
                guid: this._contextObj.getGuid(),
                callback: dojo.hitch(this, this._loadData)
            });
		}

		if (callback !== 'undefined') {
			callback();
		}
	},

	/**
	 * How the widget re-acts from actions invoked by the Mendix App.
	 */
	suspend : function () {
		'use strict';

	},

	resume : function () {
		'use strict';

	},

	enable : function () {
		'use strict';

	},

	disable : function () {
		'use strict';

	},

	unintialize: function () {
		'use strict';

	},


	/**
	 * Extra setup widget methods.
	 * ======================
	 */
    _setupWidget: function () {
        'use strict';

    },

	/**
	 * Interaction widget methods.
	 * ======================
	 */
    _loadData : function () {
        'use strict';

        var
            colIndex,
            headerRowNode,
            node,
            rowNode,
            rowIndex;

        // Destroy existing table
        if (this.tableNode) {
            dojo.destroy(this.tableNode);
        }

        // Create table
        this.tableNode = document.createElement("table");

        // Header row
        headerRowNode = document.createElement("tr");
        headerRowNode.appendChild(document.createElement("th"));
        for (colIndex = 0; colIndex < 3; colIndex = colIndex + 1) {
            headerRowNode.appendChild(this.createHeaderNode(colIndex));
        }
        this.tableNode.appendChild(headerRowNode);

        // Rows
        for (rowIndex = 0; rowIndex < 3; rowIndex = rowIndex + 1) {
            rowNode = document.createElement("tr");
            if (rowIndex % 2 === 0) {
                dojo.addClass(rowNode, "PivotDataWidgetEvenRow");
            } else {
                dojo.addClass(rowNode, "PivotDataWidgetOddRow");
            }

            // The row label
            node = mxui.dom.th("Row " + rowIndex);
            rowNode.appendChild(node);

            // Columns
            for (colIndex = 0; colIndex < 3; colIndex = colIndex + 1) {
                node = dojo.toDom(
                    "<td style=\"" + this._contextObj.get("ResultCssTableCell") + "\"></td>"
                );
                node.innerHTML = rowIndex + colIndex;
                rowNode.appendChild(node);
            }

            this.tableNode.appendChild(rowNode);
        }

        // Show the table
        this.domNode.appendChild(this.tableNode);

    },


    /**
     * Create a header cell node.
     *
     * @param colIndex          The value to show in the header
     * @@returns The node
     */
    createHeaderNode : function (colIndex) {
        'use strict';

        var
            node;

        node = dojo.toDom(
            "<th style=\"" + this._contextObj.get("ResultCssHeaderTh") + "\">" +
            "<div style=\"" + this._contextObj.get("ResultCssHeaderDiv") + "\">" +
            "<span style=\"" + this._contextObj.get("ResultCssHeaderSpan") + "\">Column " + colIndex +
            "</span></div></th>"
        );

        return node;

    }

});