import * as React from "react";
import {
  DiagramComponent,
  SymbolPaletteComponent,
  // Node,
  Inject,
  // NodeConstraints,
  PrintAndExport,
  UndoRedo,
  BpmnDiagrams,
} from "@syncfusion/ej2-react-diagrams";
import { Grid } from "@material-ui/core";
import "./styles.css";
import {
  DropDownButtonComponent,
  // ItemModel,
  // MenuEventArgs,
} from "@syncfusion/ej2-react-splitbuttons";
import {
  ToolbarComponent,
  // ClickEventArgs,
  ItemsDirective,
  ItemDirective,
} from "@syncfusion/ej2-react-navigations";
let diagramInstance:any;
// let basicShapes = [
//   {
//     shape: { type: "Basic", shape: "Rectangle" },
//     id: "Rectangle",
//   },
//   {
//     shape: { type: "Basic", shape: "Ellipse" },
//     id: "Ellipse",
//   },
//   {
//     shape: { type: "Basic", shape: "Triangle" },
//     id: "Triangle",
//   },
//   {
//     shape: { type: "Basic", shape: "Plus" },
//     id: "Plus",
//   },
//   {
//     shape: { type: "Basic", shape: "Star" },
//     id: "Star",
//   },
//   {
//     shape: { type: "Basic", shape: "Pentagon" },
//     id: "Pentagon",
//   },
//   {
//     shape: { type: "Basic", shape: "Heptagon" },
//     id: "Heptagon",
//   },
//   {
//     shape: { type: "Basic", shape: "Octagon" },
//     id: "Octagon",
//   },
//   {
//     shape: { type: "Basic", shape: "Trapezoid" },
//     id: "Trapezoid",
//   },
//   {
//     shape: { type: "Basic", shape: "Decagon" },
//     id: "Decagon",
//   },
//   {
//     shape: { type: "Basic", shape: "RightTriangle" },
//     id: "Right Triangle",
//   },
//   {
//     shape: { type: "Basic", shape: "Parallelogram" },
//     id: "Parallelogram",
//   },
// ];
// let swimlane = [
//   {
//     id: "stackCanvas1",
//     addInfo: { tooltip: "Horizontal swimlane" },
//     shape: {
//       type: "SwimLane",
//       lanes: [
//         {
//           id: "lane1",
//           style: { strokeColor: "#757575" },
//           height: 60,
//           width: 150,
//           header: {
//             width: 50,
//             height: 50,
//             style: { strokeColor: "#757575", fontSize: 11 },
//           },
//         },
//       ],
//       orientation: "Horizontal",
//       isLane: true,
//     },
//     height: 60,
//     width: 140,
//     offsetX: 70,
//     offsetY: 30,
//   },
//   {
//     id: "stackCanvas2",
//     addInfo: { tooltip: "Vertical swimlane" },
//     shape: {
//       type: "SwimLane",
//       lanes: [
//         {
//           id: "lane1",
//           style: { strokeColor: "#757575" },
//           height: 150,
//           width: 60,
//           header: {
//             width: 50,
//             height: 50,
//             style: { strokeColor: "#757575", fontSize: 11 },
//           },
//         },
//       ],
//       orientation: "Vertical",
//       isLane: true,
//     },
//     height: 140,
//     width: 60,
//     // style: { fill: '#f5f5f5' },
//     offsetX: 70,
//     offsetY: 30,
//   },
//   {
//     id: "verticalPhase",
//     addInfo: { tooltip: "Vertical phase" },
//     shape: {
//       type: "SwimLane",
//       phases: [
//         {
//           style: {
//             strokeWidth: 1,
//             strokeDashArray: "3,3",
//             strokeColor: "#757575",
//           },
//         },
//       ],
//       annotations: [{ text: "" }],
//       orientation: "Vertical",
//       isPhase: true,
//     },
//     height: 60,
//     width: 140,
//     style: { strokeColor: "#757575" },
//   },
//   {
//     id: "horizontalPhase",
//     addInfo: { tooltip: "Horizontal phase" },
//     shape: {
//       type: "SwimLane",
//       phases: [
//         {
//           style: {
//             strokeWidth: 1,
//             strokeDashArray: "3,3",
//             strokeColor: "#757575",
//           },
//         },
//       ],
//       annotations: [{ text: "" }],
//       orientation: "Horizontal",
//       isPhase: true,
//     },
//     height: 60,
//     width: 140,
//     style: { strokeColor: "#757575" },
//   },
// ];
// let bpmnShapes = [
//   {
//     id: "Start",
//     width: 35,
//     height: 35,
//     shape: {
//       type: "Bpmn",
//       shape: "Event",
//       event: { event: "Start" },
//     },
//   },
//   {
//     id: "NonInterruptingIntermediate",
//     width: 35,
//     height: 35,
//     shape: {
//       type: "Bpmn",
//       shape: "Event",
//       event: { event: "NonInterruptingIntermediate" },
//     },
//   },
//   {
//     shape: { type: "Bpmn", shape: "Event" },
//     id: "NonInterruptingIntermediate",
//   },
//   {
//     id: "End",
//     width: 35,
//     height: 35,
//     offsetX: 665,
//     offsetY: 230,
//     shape: {
//       type: "Bpmn",
//       shape: "Event",
//       event: { event: "End" },
//     },
//   },
//   {
//     id: "Task",
//     width: 35,
//     height: 35,
//     offsetX: 700,
//     offsetY: 700,
//     shape: {
//       type: "Bpmn",
//       shape: "Activity",
//       activity: {
//         activity: "Task",
//       },
//     },
//   },
//   {
//     id: "Transaction",
//     width: 35,
//     height: 35,
//     offsetX: 300,
//     offsetY: 100,
//     constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
//     shape: {
//       type: "Bpmn",
//       shape: "Activity",
//       activity: {
//         activity: "SubProcess",
//         subProcess: {
//           type: "Transaction",
//           transaction: {
//             cancel: { visible: false },
//             failure: { visible: false },
//             success: { visible: false },
//           },
//         },
//       },
//     },
//   },
//   {
//     id: "Task_Service",
//     width: 35,
//     height: 35,
//     offsetX: 700,
//     offsetY: 700,
//     shape: {
//       type: "Bpmn",
//       shape: "Activity",
//       activity: {
//         activity: "Task",
//         task: { type: "Service" },
//       },
//     },
//   },
//   {
//     id: "Gateway",
//     width: 35,
//     height: 35,
//     offsetX: 100,
//     offsetY: 100,
//     shape: { type: "Bpmn", shape: "Gateway", gateway: { type: "Exclusive" } },
//   },
//   {
//     id: "DataObject",
//     width: 35,
//     height: 35,
//     offsetX: 500,
//     offsetY: 100,
//     shape: {
//       type: "Bpmn",
//       shape: "DataObject",
//       dataObject: { collection: false, type: "None" },
//     },
//   },
//   {
//     id: "subProcess",
//     width: 520,
//     height: 250,
//     offsetX: 355,
//     offsetY: 230,
//     constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
//     shape: {
//       shape: "Activity",
//       type: "Bpmn",
//       activity: {
//         activity: "SubProcess",
//         subProcess: {
//           type: "Transaction",
//           collapsed: false,
//           processes: [],
//           transaction: {
//             cancel: { visible: false },
//             failure: { visible: false },
//             success: { visible: false },
//           },
//         },
//       },
//     },
//   },
// ];
let connectorSymbols = [
  {
    id: "Link1",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: {
      shape: "Arrow",
      style: { strokeColor: "#757575", fill: "#757575" },
    },
    style: { strokeWidth: 1, strokeColor: "#757575" },
  },
  {
    id: "Link21",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: {
      shape: "Arrow",
      style: { strokeColor: "#757575", fill: "#757575" },
    },
    style: { strokeWidth: 1, strokeColor: "#757575" },
  },
  {
    id: "link3",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: "#757575" },
    targetDecorator: { shape: "None" },
  },
  {
    id: "link23",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: "#757575" },
    targetDecorator: { shape: "None" },
  },
  {
    id: "link33",
    type: "Bezier",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: "#757575" },
    targetDecorator: { shape: "None" },
  },
  {
    id: "Link2",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    targetDecorator: {
      shape: "Arrow",
      style: { strokeColor: "#757575", fill: "#757575" },
    },
    style: { strokeWidth: 1, strokeDashArray: "4 4", strokeColor: "#757575" },
  },

  {
    id: "Link22",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: {
      shape: "Arrow",
      style: { strokeColor: "#757575", fill: "#757575" },
    },
    style: { strokeWidth: 1, strokeDashArray: "4 4", strokeColor: "#757575" },
  },
  {
    id: "link33",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeDashArray: "4 4", strokeColor: "#757575" },
    targetDecorator: { shape: "None" },
  },
  {
    id: "link23",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeDashArray: "4 4", strokeColor: "#757575" },
    targetDecorator: { shape: "None" },
  },
  {
    id: "link33",
    type: "Bezier",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeDashArray: "4 4", strokeColor: "#757575" },
    targetDecorator: { shape: "None" },
  },
];
// let flowshapes = [
//   { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
//   { id: "Process", shape: { type: "Flow", shape: "Process" } },
//   { id: "Decision", shape: { type: "Flow", shape: "Decision" } },
//   { id: "Document", shape: { type: "Flow", shape: "Document" } },
//   {
//     id: "PreDefinedProcess",
//     shape: { type: "Flow", shape: "PreDefinedProcess" },
//   },
//   { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
//   { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
//   { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } },
//   { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
//   { id: "MultiDocument", shape: { type: "Flow", shape: "MultiDocument" } },
//   { id: "Collate", shape: { type: "Flow", shape: "Collate" } },
//   { id: "SummingJunction", shape: { type: "Flow", shape: "SummingJunction" } },
//   { id: "Or", shape: { type: "Flow", shape: "Or" } },
//   { id: "InternalStorage", shape: { type: "Flow", shape: "InternalStorage" } },
//   { id: "Extract", shape: { type: "Flow", shape: "Extract" } },
//   { id: "ManualOperation", shape: { type: "Flow", shape: "ManualOperation" } },
//   { id: "Merge", shape: { type: "Flow", shape: "Merge" } },
//   {
//     id: "OffPageReference",
//     shape: { type: "Flow", shape: "OffPageReference" },
//   },
//   {
//     id: "SequentialAccessStorage",
//     shape: { type: "Flow", shape: "SequentialAccessStorage" },
//   },
//   { id: "Annotation", shape: { type: "Flow", shape: "Annotation" } },
//   { id: "Annotation2", shape: { type: "Flow", shape: "Annotation2" } },
//   { id: "Data", shape: { type: "Flow", shape: "Data" } },
//   { id: "Card", shape: { type: "Flow", shape: "Card" } },
//   { id: "Delay", shape: { type: "Flow", shape: "Delay" } },
// ];
let items = [
  {
    text: "JPG",
  },
  {
    text: "PNG",
  },
  {
    text: "BMP",
  },
  {
    text: "SVG",
  },
  {
    text: "XML",
  },
];

const FlowChart = () => {
  const contentTemplate = () => {
    return (
      <DropDownButtonComponent
        items={items}
        iconCss="e-diagram-icons e-diagram-export"
        content="Export"
        select={onselect}
      ></DropDownButtonComponent>
    );
  };
  const onItemClick = (args:any) => {
    let printOptions = ({
      mode:'',
      region:'',
      margin:{
          left:0,top:0,bottom:0,right:0
      }
    })
  
    switch (args.item.text) {
      case "Print":
        {
          printOptions.mode = "Data";
          printOptions.region = "PageSettings";
          printOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
          diagramInstance.print(printOptions);
        }
        break;
    }
  };
  const onselect = (args:any) => {
    let exportOptions = ({
        format:'',
        mode:'',
        region:'',
        fileName:'',
        margin:{
            left:0,top:0,bottom:0,right:0
        }
    })
    switch (args.item.text) {
      case "JPG":
        exportOptions.format = args.item.text;
        break;
      case "PNG":
        exportOptions.format = args.item.text;
        break;
      case "BMP":
        exportOptions.format = args.item.text;
        break;
      case "SVG":
        exportOptions.format = args.item.text;
        break;
      case "XML":
        exportOptions.format = args.item.text;
        break;
    }
    exportOptions.mode = "Download";
    exportOptions.region = "PageSettings";
    exportOptions.fileName = "Export";
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    diagramInstance.exportDiagram(exportOptions);
  };
  return (
    <div className="image-cropper-wrap">
   

      <Grid container justify="space-between">
        <Grid item md={2} style={{ paddingRight: 20 }}>
          <ToolbarComponent
            style={{
              width: "100%",
              height: "10%",
              marginTop: "10px",
              float: "left",
            }}
            id="toolbar_diagram"
            clicked={onItemClick}
          >
            <ItemsDirective>
              <ItemDirective
                type="Input"
                text="Export"
                template={contentTemplate}
              ></ItemDirective>
              {/* <ItemDirective 
          type={"Button"} text="Print"
           prefixIcon="e-diagram-icons e-diagram-print" 
            /> */}
              {/* <ItemDirective type={"Input"} template={checkboxTemplate} /> */}
            </ItemsDirective>
          </ToolbarComponent>
          <SymbolPaletteComponent
            id="symbolpalette"
            expandMode="Multiple"
            palettes={[
              {
                id: "basic",
                expanded: true,
                // symbols: basicShapes,
                iconCss: "e-diagram-icons1 e-diagram-basic",
                title: "Basic Shapes",
              },
              {
                id: "flow",
                expanded: false,
                // symbols: flowshapes,
                iconCss: "e-diagram-icons1 e-diagram-flow",
                title: "Flow Shapes",
              },
              {
                id: "swimlane",
                expanded: false,
                // symbols: swimlane,
                iconCss: "e-diagram-icons1 e-diagram-swimlane",
                title: "Swimlane Shapes",
              },
              // {
              //   id: "Bpmn",
              //   expanded: false,
              //   symbols: bpmnShapes,
              //   iconCss: "e-diagram-icons1 e-diagram-Bpmn",
              //   title: "BPMN Shapes",
              // },
              {
                id: "connectors",
                expanded: false,
                symbols: connectorSymbols,
                iconCss: "e-diagram-icons1 e-diagram-connector",
                title: "Connectors",
              },
            ]}
            width={"100%"}
            height={"700px"}
            symbolHeight={60}
            symbolWidth={60}
            getNodeDefaults={(symbol:any) => {
              if (
                symbol.id === "Terminator" ||
                symbol.id === "Process" ||
                symbol.id === "Delay"
              ) {
                symbol.width = 80;
                symbol.height = 40;
              } else if (
                symbol.id === "Decision" ||
                symbol.id === "Document" ||
                symbol.id === "PreDefinedProcess" ||
                symbol.id === "PaperTap" ||
                symbol.id === "DirectData" ||
                symbol.id === "MultiDocument" ||
                symbol.id === "Data"
              ) {
                symbol.width = 50;
                symbol.height = 40;
              } else {
                symbol.width = 50;
                symbol.height = 50;
              }
              symbol.style.strokeColor = "#757575";
            }}
            symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
            getSymbolInfo={(symbol:any) => {
              return { fit: true };
            }}
          />
        </Grid>
        <Grid item md={10} style={{ paddingRight: 20 }}>
          <DiagramComponent
            id="diagram"
            ref={(diagram:any) => (diagramInstance = diagram)}
            width={"100%"}
            height={"500px"}
          >
            <Inject services={[UndoRedo, PrintAndExport, BpmnDiagrams]} />
          </DiagramComponent>
        </Grid>
      </Grid>
    </div>
  );
};
export default FlowChart;
