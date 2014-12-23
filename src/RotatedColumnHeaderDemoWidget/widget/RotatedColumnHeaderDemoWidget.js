/*global mx, mendix, require, console, define, module, logger */
/**
	Rotated column header demo widget
	========================

	@file      : RotatedColumnHeaderDemoWidget.js
	@author    : Marcel Groeneweg
	@date      : 07-10-2014
	@copyright : Synobsys
	@license   : Apache License, Version 2.0, January 2004

	Documentation
	=============
	This widget shows an example using the generated CSS. Used in the pivot table demo project

*/
(function () {
    'use strict';

    // Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
    require([

        'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_Widget',
        'mxui/dom', 'dojo/dom-class', 'dojo/dom-construct', 'dojo/_base/lang'

    ], function (declare, _WidgetBase, _Widget, domMx, domClass, domConstruct, lang) {

        // Declare widget.
        return declare('RotatedColumnHeaderDemoWidget.widget.RotatedColumnHeaderDemoWidget', [ _WidgetBase, _Widget ], {

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

                // postCreate

                // Load CSS ... automaticly from ui directory

                // Setup widgets
                this._setupWidget();

            },

            // DOJO.WidgetBase -> Startup is fired after the properties of the widget are set.
            startup: function () {

            },

            /**
             * What to do when data is loaded?
             */

            update : function (obj, callback) {

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
                        callback: lang.hitch(this, this._loadData)
                    });
                }

                if (callback !== 'undefined') {
                    callback();
                }
            },

            /**
             * Extra setup widget methods.
             * ======================
             */
            _setupWidget: function () {

            },

            /**
             * Interaction widget methods.
             * ======================
             */
            _loadData : function () {

                var
                    colIndex,
                    headerRowNode,
                    node,
                    rowNode,
                    rowIndex;

                // Destroy existing table
                if (this.tableNode) {
                    domConstruct.destroy(this.tableNode);
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
                        domClass.add(rowNode, "PivotDataWidgetEvenRow");
                    } else {
                        domClass.add(rowNode, "PivotDataWidgetOddRow");
                    }

                    // The row label
                    node = domMx.th("Row " + rowIndex);
                    rowNode.appendChild(node);

                    // Columns
                    for (colIndex = 0; colIndex < 3; colIndex = colIndex + 1) {
                        node = domConstruct.toDom(
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

                var
                    node;

                node = domConstruct.toDom(
                    "<th style=\"" + this._contextObj.get("ResultCssHeaderTh") + "\">" +
                        "<div style=\"" + this._contextObj.get("ResultCssHeaderDiv") + "\">" +
                        "<span style=\"" + this._contextObj.get("ResultCssHeaderSpan") + "\">Column " + colIndex +
                        "</span></div></th>"
                );

                return node;

            }

        });
    });

}());
