/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

function getForgeToken(callback) {
    jQuery.ajax({
      url: '/api/forge/oauth/token',
      success: function (res) {
        callback(res.access_token, res.expires_in)
      }
    });
  }



var viewerApp1;
var _viewer3D1;

function launchViewer1(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };
  var documentId = 'urn:' + urn;
  Autodesk.Viewing.Initializer(options, function onInitialized() {
    viewerApp1 = new Autodesk.Viewing.ViewingApplication('forgeViewer1');
    viewerApp1.registerViewer(viewerApp1.k3D, Autodesk.Viewing.Private.GuiViewer3D);
    viewerApp1.loadDocument(documentId, onDocumentLoadSuccess1, onDocumentLoadFailure1);
  });
}
function onSelectionChanged(event) {
    // Let's only control selection in case of
    // single user selection
    
    if (event.dbIdArray.length === 1 && event.dbIdArray[0] === 1618) {
        $('.circuit').show();
    }
}
function onDocumentLoadSuccess1(doc) {
    // We could still make use of Document.getSubItemsWithProperties()
  // However, when using a ViewingApplication, we have access to the **bubble** attribute,
  // which references the root node of a graph that wraps each object from the Manifest JSON.
  var viewables = viewerApp1.bubble.search({ 'type': 'geometry', 'role':'3d' });
  if (viewables.length === 0) {
    console.error('Document contains no viewables.');
    return;
  }

  // Choose any of the avialble viewables
  viewerApp1.selectItem(viewables[0].data, onItemLoadSuccess1, onItemLoadFail1);
}

function onDocumentLoadFailure1(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess1(viewer, item) {
    
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionChanged)
    var data = [
        {x: "Steel", value: 223553265},
        {x: "Iron", value: 38929319},
        {x: "Aluminium", value: 2932248},
        {x: "copper", value: 14674252},
        {x: "bronze", value: 540013},
        {x: "Alloy", value: 19107368},
        {x: "Polycarbonate", value: 9009073}
    ];
      // create the chart
  var chart = anychart.pie();

  // set the chart title
  chart.title("Percentage of materials used");

  // add the data
  chart.data(data);

  // display the chart in the container
  chart.container('chart_container');
  chart.draw();
}

function onItemLoadFail1(errorCode) {
  console.error('onItemLoadFail() - errorCode:' + errorCode);
}


var viewerApp2;
var _viewer3D2;

function launchViewer2(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };
  var documentId = 'urn:' + urn;
  Autodesk.Viewing.Initializer(options, function onInitialized() {
    viewerApp2 = new Autodesk.Viewing.ViewingApplication('forgeViewer2');
    viewerApp2.registerViewer(viewerApp2.k3D, Autodesk.Viewing.Private.GuiViewer3D);
    viewerApp2.loadDocument(documentId, onDocumentLoadSuccess2, onDocumentLoadFailure2);
  });
}

function onDocumentLoadSuccess2(doc) {
    // We could still make use of Document.getSubItemsWithProperties()
  // However, when using a ViewingApplication, we have access to the **bubble** attribute,
  // which references the root node of a graph that wraps each object from the Manifest JSON.
  var viewables = viewerApp2.bubble.search({ 'type': 'geometry', 'role':'2d' });
  if (viewables.length === 0) {
    console.error('Document contains no viewables.');
    return;
  }

  // Choose any of the avialble viewables
  viewerApp2.selectItem(viewables[0].data, onItemLoadSuccess2, onItemLoadFail2);
}

function onDocumentLoadFailure2(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess2(viewer, item) {

}

function onItemLoadFail2(errorCode) {
  console.error('onItemLoadFail() - errorCode:' + errorCode);
}





