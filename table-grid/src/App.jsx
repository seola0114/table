import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Box, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const columns = [
  { field: "section", headerName: "상태 그룹", width: 100 },
  { field: "variant", headerName: "상태", width: 140 },
  { field: "no", headerName: "No.", width: 70 },
  { field: "cost", headerName: "비용항목", width: 120, renderCell: (p) => <DropdownCell value={p.value} /> },
  { field: "item", headerName: "품목", width: 120 },
  { field: "pickup", headerName: "상차지", width: 120 },
  { field: "drop", headerName: "하차지", width: 120 },
  { field: "rateSale", headerName: "요율구분-매출", width: 140 },
  { field: "rateBuy", headerName: "요율구분-매입", width: 140 },
  { field: "car", headerName: "차종", width: 120 },
  { field: "unitSale", headerName: "요율단가-매출", width: 140 },
  { field: "unitBuy", headerName: "요율단가-매입", width: 140 },
  { field: "unitOwn", headerName: "요율단가(위수탁)-자점", width: 180 },
  { field: "unitOther", headerName: "요율단가(위수탁)-타점", width: 180 },
  { field: "ton1Sale", headerName: "1Ton-매출", width: 120 },
  { field: "ton1Buy", headerName: "1Ton-매입", width: 120 },
  { field: "ton25", headerName: "2.5Ton", width: 120 },
  { field: "ton6", headerName: "6Ton", width: 120 },
  { field: "ton8", headerName: "8Ton", width: 120 },
  { field: "ton18", headerName: "18Ton", width: 120 },
  { field: "ton25W", headerName: "25Ton(위수탁)", width: 140 },
  { field: "franchise", headerName: "운송가맹점 계약할당", width: 160 },
  { field: "chgSale", headerName: "변경횟수-매출", width: 140 },
  { field: "chgBuy", headerName: "변경횟수-매입", width: 140 },
  { field: "nodeUp", headerName: "노드ID-상차노드", width: 140 },
  { field: "nodeDown", headerName: "노드ID-하차노드", width: 140 },
];

const editableFields = [
  "cost",
  "item",
  "pickup",
  "drop",
  "rateSale",
  "rateBuy",
  "car",
  "unitSale",
  "unitBuy",
  "unitOwn",
  "unitOther",
  "ton1Sale",
  "ton1Buy",
  "ton25",
  "ton6",
  "ton8",
  "ton18",
  "ton25W",
  "franchise",
  "chgSale",
  "chgBuy",
  "nodeUp",
  "nodeDown",
];

const columnsWithEdit = columns.map((col) => {
  const base = {
    ...col,
    flex: 0,
    minWidth: col.width,
    maxWidth: col.width,
  };
  return editableFields.includes(col.field) ? { ...base, editable: true } : base;
});

const requiredFields = [
  "item",
  "pickup",
  "drop",
  "nodeUp",
  "nodeDown",
  "rateSale",
];

const hasMissingRequired = (row) =>
  requiredFields.some((field) => !row[field] || row[field] === "입력");

const baseRow = {
  checked: false,
  cost: "입력",
  item: "입력",
  pickup: "입력",
  drop: "입력",
  rateSale: "입력",
  rateBuy: "입력",
  car: "입력",
  unitSale: "입력",
  unitBuy: "입력",
  unitOwn: "입력",
  unitOther: "입력",
  ton1Sale: "입력",
  ton1Buy: "입력",
  ton25: "입력",
  ton6: "입력",
  ton8: "입력",
  ton18: "입력",
  ton25W: "입력",
  franchise: "입력",
  chgSale: "입력",
  chgBuy: "입력",
  nodeUp: "입력",
  nodeDown: "입력",
};

// 상태 데모용 상단 테이블 데이터
const statusRows = [
  { id: 1, section: "Enabled", variant: "Default", no: 1, checked: false, ...baseRow, cost: "운송료" },
  { id: 2, section: "Enabled", variant: "Checked", no: 2, checked: true, ...baseRow, cost: "운송료" },
  { id: 3, section: "Enabled", variant: "Hover", no: 3, checked: false, simulatedHover: true, ...baseRow, cost: "운송료" },
  { id: 4, section: "Enabled", variant: "Hover + Checked", no: 4, checked: true, simulatedHover: true, ...baseRow, cost: "운송료" },
  { id: 5, section: "Focus", variant: "Default", no: 5, checked: false, ...baseRow, cost: "운송료" },
  { id: 6, section: "Focus", variant: "Checked", no: 6, checked: true, ...baseRow, cost: "운송료" },
  { id: 7, section: "Focus", variant: "Hover", no: 7, checked: false, simulatedHover: true, ...baseRow, cost: "운송료" },
  { id: 8, section: "Edited", variant: "Default", no: 8, checked: false, ...baseRow, cost: "운송료" },
  { id: 9, section: "Edited", variant: "Checked", no: 9, checked: true, ...baseRow, cost: "운송료" },
  { id: 10, section: "Edited", variant: "Hover", no: 10, checked: false, simulatedHover: true, ...baseRow, cost: "운송료" },
  { id: 11, section: "Error", variant: "Default", no: 11, checked: false, ...baseRow, cost: "운송료" },
  { id: 12, section: "Error", variant: "Checked", no: 12, checked: true, ...baseRow, cost: "운송료" },
  { id: 13, section: "Error", variant: "Hover", no: 13, checked: false, simulatedHover: true, ...baseRow, cost: "운송료" },
];

// data_sample.xlsx에서 추출한 예시 데이터 (상위 3건)
const dataRows = [
  {
    id: 1,
    section: "Enabled",
    variant: "Default",
    no: 1,
    checked: false,
    ...baseRow,
    cost: "판지",
    item: "(주)한국팩키지",
    pickup: "경기 안산시 단원구 원시동",
    drop: "경남 거창군 거창읍",
    rateSale: "409000",
    rateBuy: "409000",
    car: "부산95아9844",
    unitSale: "더운반)경기지사",
    unitBuy: "경기)지사_수송",
    nodeUp: "FS2510101856171",
    nodeDown: "MF2510101856175",
  },
  {
    id: 2,
    section: "Enabled",
    variant: "Default",
    no: 2,
    checked: false,
    ...baseRow,
    cost: "기타",
    item: "수퍼빈(주)",
    pickup: "강원도 고성군 현내면 사천리 447",
    drop: "강원도 동해시 송정동산24-22번지",
    rateSale: "249000",
    rateBuy: "249000",
    car: "경기89자2117",
    unitSale: "더운반)경기지사",
    unitBuy: "경기)지사_수송",
    nodeUp: "FS2510101856185",
    nodeDown: "MF2510101856201",
  },
  {
    id: 3,
    section: "Enabled",
    variant: "Default",
    no: 3,
    checked: false,
    ...baseRow,
    cost: "기타",
    item: "수퍼빈(주)",
    pickup: "강원도 춘천시 퇴계동633-2번지 퇴계동",
    drop: "경기도 남양주시 와부읍 덕소리590-17번지",
    rateSale: "230000",
    rateBuy: "230000",
    car: "경기88사3118",
    unitSale: "더운반)경기지사",
    unitBuy: "경기)지사_수송",
    nodeUp: "FS2510101856181",
    nodeDown: "MF2510101856197",
  },
];

const sectionColors = {
  Enabled: "#fff",
  Focus: "hsla(216, 100%, 58%, 0.06)",
  Edited: "#FEF6E6",
  Error: "#FFF0F0",
};
const overlayColor = "hsla(216, 100%, 58%, 0.06)";
const checkedBg = "hsla(216, 100%, 58%, 0.12)";

function DropdownCell({ value }) {
  const [open, setOpen] = React.useState(false);
  const options = ["전체", "CL1", "기타"];
  return (
    <Box position="relative" display="inline-block" sx={{ width: "100%" }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          px: 1.5, py: 0.75, border: "none",
          borderRadius: "0px", bgcolor: "transparent", width: "100%",
          display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 1, cursor: "pointer",
          fontFamily: "SUIT Variable", fontSize: 13, fontWeight: 500, color: "#16171b",
        }}
      >
        {value}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9.46699 0.341667L4.91699 5.65C4.83366 5.75 4.68366 5.75 4.60033 5.65L0.0503265 0.341667C-0.0663402 0.208333 0.0336598 0 0.20866 0H9.31699C9.49199 0 9.58366 0.208333 9.47533 0.341667H9.46699Z"
            fill="#9EA4B1"
          />
        </svg>
      </Box>
      {open && (
        <Box sx={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 10,
          bgcolor: "#fff", outline: "none", boxShadow: "0 0 12px rgba(0,0,0,0.1)",
          borderRadius: "6px", p: "4px", display: "flex", flexDirection: "column", gap: "2px"
        }}>
          {options.map(opt => (
            <Box
              key={opt}
              onClick={() => setOpen(false)}
              sx={{
                px: 1, py: 0.75, borderRadius: "6px", cursor: "pointer",
                fontFamily: "SUIT Variable", fontSize: 13, fontWeight: 500, color: "#16171b",
                "&:hover": { bgcolor: "#f5f7fc" }
              }}
            >
              {opt}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default function App() {
  const [data, setData] = React.useState(statusRows);
  const [playgroundRows, setPlaygroundRows] = React.useState(dataRows);
  const [selection, setSelection] = React.useState(dataRows.filter((r) => r.checked).map((r) => r.id));
  const [mainSelection, setMainSelection] = React.useState(statusRows.filter((r) => r.checked).map((r) => r.id));
  const [focusedMain, setFocusedMain] = React.useState(null);
  const [focusedPlayground, setFocusedPlayground] = React.useState(null);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const addRow = () => {
    const nextId = playgroundRows.reduce((max, r) => Math.max(max, r.id), 0) + 1;
    setPlaygroundRows((prev) => [
      { id: nextId, section: "Edited", variant: "New", no: nextId, ...baseRow },
      ...prev,
    ]);
  };

  const deleteRows = () => {
    setPlaygroundRows((prev) => prev.filter((r) => !selection.includes(r.id)));
    setSelection([]);
  };

  const saveRows = () => {
    setPlaygroundRows((prev) =>
      prev.map((row) => {
        if (row.section === "Edited" && hasMissingRequired(row)) {
          return { ...row, section: "Error", variant: "Default" };
        }
        return row;
      })
    );
    setToastMessage("등록이 완료되었습니다.");
    setToastOpen(true);
  };

  const mainRowClass = React.useCallback(
    (params) => {
      let cls = `row-${params.row.section}`;
      if (params.row.checked) cls += " row-checked";
      if (params.id === focusedMain) cls += " row-focused";
      if (params.row.simulatedHover) cls += " row-sim-hover";
      return cls;
    },
    [focusedMain]
  );

  const playgroundRowClass = React.useCallback(
    (params) => {
      let cls = `row-${params.row.section}`;
      if (params.row.checked) cls += " row-checked";
      if (params.id === focusedPlayground) cls += " row-focused";
      if (params.row.simulatedHover) cls += " row-sim-hover";
      return cls;
    },
    [focusedPlayground]
  );

  const handleMainSelection = (ids) => {
    setMainSelection(ids);
    setData((prev) =>
      prev.map((row) => ({ ...row, checked: ids.includes(row.id) }))
    );
  };

  const handlePlaygroundSelection = (ids) => {
    setSelection(ids);
    setPlaygroundRows((prev) =>
      prev.map((row) => ({ ...row, checked: ids.includes(row.id) }))
    );
  };

  const toggleMainCheckbox = (id) => {
    if (id === "__all__") {
      const allIds = data.map((r) => r.id);
      const next = mainSelection.length === allIds.length ? [] : allIds;
      handleMainSelection(next);
    } else {
      const next = mainSelection.includes(id)
        ? mainSelection.filter((v) => v !== id)
        : [...mainSelection, id];
      handleMainSelection(next);
    }
  };

  const togglePlaygroundCheckbox = (id) => {
    if (id === "__all__") {
      const allIds = playgroundRows.map((r) => r.id);
      const next = selection.length === allIds.length ? [] : allIds;
      handlePlaygroundSelection(next);
    } else {
      const next = selection.includes(id)
        ? selection.filter((v) => v !== id)
        : [...selection, id];
      handlePlaygroundSelection(next);
    }
  };

  const processMainRowUpdate = React.useCallback(
    (newRow) => {
      setData((prev) => prev.map((row) => (row.id === newRow.id ? { ...row, ...newRow } : row)));
      return newRow;
    },
    []
  );

  const processPlaygroundRowUpdate = React.useCallback(
    (newRow) => {
      setPlaygroundRows((prev) => prev.map((row) => (row.id === newRow.id ? { ...row, ...newRow } : row)));
      return newRow;
    },
    []
  );

  React.useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 2000);
    return () => clearTimeout(t);
  }, [toastOpen]);

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <DataGridPro
          rows={data}
          columns={columnsWithEdit}
          columnHeaderHeight={64}
          rowHeight={32}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={mainSelection}
          onRowSelectionModelChange={handleMainSelection}
          processRowUpdate={processMainRowUpdate}
          getRowClassName={mainRowClass}
          getCellClassName={(params) => {
            if (params.row.section === "Error" && requiredFields.includes(params.field) &&
              (!params.value || params.value === "입력")) {
              return "cell-error";
            }
            return "";
          }}
          onColumnHeaderClick={(params) => {
            if (params.colDef?.field === "__check__") {
              toggleMainCheckbox("__all__");
            }
          }}
          onCellClick={(params) => {
            if (params.field === "__check__") {
              toggleMainCheckbox(params.id);
              return;
            }
            setFocusedMain(params.id);
          }}
          autoHeight
          sx={{
            fontFamily: "SUIT Variable",
            "& .row-Enabled": { bgcolor: sectionColors.Enabled },
            "& .row-Focus": { bgcolor: sectionColors.Focus },
            "& .row-Edited": { bgcolor: sectionColors.Edited },
            "& .row-Error": { bgcolor: sectionColors.Error },
            "& .row-checked .MuiDataGrid-cell": {
              backgroundColor: checkedBg,
            },
            "& .cell-error": {
              border: "1px solid #DC0C0C !important",
            },
            "& .row-Edited .MuiDataGrid-cell": {
              display: "flex",
              padding: "6px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "var(--Colors-yellow-98, #FEF6E6)",
            },
            "& .row-Error .MuiDataGrid-cell": {
              display: "flex",
              padding: "6px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "var(--Colors-red-98, #FFF0F0)",
            },
            "& .row-focused .MuiDataGrid-cell": {
              display: "flex",
              padding: "6px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "rgba(40, 126, 255, 0.06)",
            },
            "& .row-sim-hover .MuiDataGrid-cell": {
              backgroundImage: `linear-gradient(0deg, ${overlayColor} 0%, ${overlayColor} 100%)`,
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#DEE1E8",
              color: "var(--Colors-grey-30, #444855)",
              fontWeight: 500,
              fontSize: 13,
              fontFamily: "SUIT Variable",
              lineHeight: "20px",
            },
            "& .MuiDataGrid-columnHeadersInner": {
              bgcolor: "#DEE1E8",
            },
            "& .MuiDataGrid-columnHeader": {
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "var(--Colors-grey-30, #444855)",
              fontFamily: "SUIT Variable",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            },
            // 헤더 체크박스 아이콘 강제 노출
            "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              margin: 0,
            },
            "& .MuiDataGrid-columnHeaderCheckbox svg": {
              width: 18,
              height: 18,
              color: "#6D6E70",
              display: "block",
            },
            "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
              transition: "background-color 0.25s ease, background-image 0.25s ease",
              color: "var(--Semantic-Static-black, #16171B)",
              textAlign: "left",
              fontFamily: "SUIT Variable",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              padding: "6px 12px",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "8px",
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "var(--Semantic-Static-white, #FFF)",
              color: "var(--Semantic-Static-black, #16171B)",
              fontFamily: "SUIT Variable",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: "0 0 auto",
            },
            "& .MuiDataGrid-columnHeader[data-field='section']": {
              width: "100px !important",
              minWidth: "100px !important",
              maxWidth: "100px !important",
            },
            "& .MuiDataGrid-cell[data-field='section']": {
              width: "100px !important",
              minWidth: "100px !important",
              maxWidth: "100px !important",
              flex: "0 0 auto",
            },
            "& .MuiDataGrid-row": {
              transition: "background-color 0.25s ease, background-image 0.25s ease",
            },
            "& .MuiDataGrid-cell--editing": {
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "rgba(40, 126, 255, 0.06)",
              boxSizing: "border-box",
              minWidth: 0,
              overflow: "hidden",
            },
            "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
              backgroundColor: "inherit",
              backgroundImage: `linear-gradient(0deg, ${overlayColor} 0%, ${overlayColor} 100%)`,
            },
            "& .row-sim-hover .MuiDataGrid-cell": {
              backgroundImage: `linear-gradient(0deg, ${overlayColor} 0%, ${overlayColor} 100%)`,
            },
          }}
        />
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 1300,
          opacity: toastOpen ? 1 : 0,
          transition: "opacity 0.25s ease, transform 0.25s ease",
          transformOrigin: "top center",
          transform: toastOpen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-10px)",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            padding: "12px 24px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "9999px",
            border: "1px solid var(--Colors-green-50, #11A277)",
            background: "var(--Colors-green-98, #EDF7F4)",
            boxShadow: "0 5px 5px rgba(17, 162, 119, 0.15)",
          }}
        >
          <Box
            component="span"
            sx={{ display: "inline-flex", width: 20, height: 20, alignItems: "center", justifyContent: "center" }}
            aria-hidden
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99996 1.66666C5.39996 1.66666 1.66663 5.39999 1.66663 9.99999C1.66663 14.6 5.39996 18.3333 9.99996 18.3333C14.6 18.3333 18.3333 14.6 18.3333 9.99999C18.3333 5.39999 14.6 1.66666 9.99996 1.66666ZM14.9416 7.66666L8.48329 14.1333C8.39996 14.2083 8.26663 14.2083 8.18329 14.1333L5.05829 11C4.98329 10.925 4.98329 10.7917 5.05829 10.7083L5.70829 10.0583C5.79163 9.98332 5.92496 9.98332 5.99996 10.0583L8.39163 12.4417L14 6.72499C14.075 6.64999 14.2083 6.64999 14.2916 6.72499L14.9416 7.37499C15.0166 7.45832 15.0166 7.59166 14.9416 7.66666Z"
                fill="#11A277"
              />
            </svg>
          </Box>
          <Box
            component="span"
            sx={{
              color: "#11A277",
              fontSize: 14,
              fontFamily: "SUIT Variable",
              fontWeight: 700,
              lineHeight: "20px",
            }}
          >
            {toastMessage}
          </Box>
        </Box>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1}>
            <Button
              onClick={addRow}
              startIcon={
                <Box
                  component="span"
                  sx={{
                    width: 16,
                    height: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M11.333 0C11.6997 0 12 0.300326 12 0.666992V11.333C12 11.6997 11.6997 12 11.333 12H0.666992C0.300326 12 0 11.6997 0 11.333V0.666992C0 0.300326 0.300326 0 0.666992 0H11.333ZM1.06641 1.06641V10.9336H10.9336V1.06641H1.06641ZM6.36621 2.66699C6.45944 2.66699 6.53303 2.73983 6.5332 2.83301V5.4668H9.16699C9.26017 5.46697 9.33301 5.54056 9.33301 5.63379V6.36621C9.33301 6.45944 9.26017 6.53303 9.16699 6.5332H6.5332V9.16699C6.53303 9.26017 6.45944 9.33301 6.36621 9.33301H5.63379C5.54056 9.33301 5.46697 9.26017 5.4668 9.16699V6.5332H2.83301C2.73983 6.53303 2.66699 6.45944 2.66699 6.36621V5.63379C2.66699 5.54056 2.73983 5.46697 2.83301 5.4668H5.4668V2.83301C5.46697 2.73983 5.54056 2.66699 5.63379 2.66699H6.36621Z"
                      fill="var(--Colors-primary-40, #4353C1)"
                    />
                  </svg>
                </Box>
              }
              variant="outlined"
              sx={{
                display: "flex",
                px: "8px",
                py: "4px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "6px",
                border: "1px solid var(--Colors-grey-90, #DEE1E8)",
                background: "var(--Semantic-Static-white, #FFF)",
                color: "var(--Colors-grey-40, #636874)",
                fontFamily: "SUIT Variable",
                fontSize: 13,
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "20px",
                "&:hover": {
                  background: "#f5f7fc",
                  border: "1px solid var(--Colors-grey-90, #DEE1E8)",
                },
                "& .MuiButton-startIcon": {
                  marginRight: 0,
                  marginLeft: 0,
                },
              }}
            >
              행 추가
            </Button>
            <Button
              onClick={deleteRows}
              startIcon={
                <Box
                  component="span"
                  sx={{
                    width: 16,
                    height: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M13.333 2C13.6997 2 14 2.30033 14 2.66699V13.333C14 13.6997 13.6997 14 13.333 14H2.66699C2.30033 14 2 13.6997 2 13.333V2.66699C2 2.30033 2.30033 2 2.66699 2H13.333ZM3.06641 3.06641V12.9336H12.9336V3.06641H3.06641ZM11.167 7.4668C11.2589 7.46697 11.333 7.54185 11.333 7.63379V8.36621C11.333 8.45815 11.2589 8.53303 11.167 8.5332H4.83301C4.74111 8.53303 4.66699 8.45815 4.66699 8.36621V7.63379C4.66699 7.54185 4.74111 7.46697 4.83301 7.4668H11.167Z"
                      fill="#DC2F0C"
                    />
                  </svg>
                </Box>
              }
              variant="outlined"
              sx={{
                display: "flex",
                px: "8px",
                py: "4px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "6px",
                border: "1px solid var(--Colors-grey-90, #DEE1E8)",
                background: "var(--Semantic-Static-white, #FFF)",
                color: "var(--Colors-grey-40, #636874)",
                fontFamily: "SUIT Variable",
                fontSize: 13,
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "20px",
                "&:hover": {
                  background: "#f5f7fc",
                  border: "1px solid var(--Colors-grey-90, #DEE1E8)",
                },
                "& .MuiButton-startIcon": {
                  marginRight: 0,
                  marginLeft: 0,
                },
              }}
            >
              행 삭제
            </Button>
          </Stack>
          <Button
            onClick={saveRows}
            startIcon={
              <Box
                component="span"
                sx={{
                  width: 16,
                  height: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 11 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.88333 7.28347L0.05 3.46056C-0.0166667 3.39408 -0.0166667 3.29435 0.05 3.22786L0.57 2.70928C0.636666 2.64279 0.736666 2.64279 0.803333 2.70928L4.04333 5.94047L9.86333 0.049864C9.93 -0.0166213 10.03 -0.0166213 10.0967 0.049864L10.6167 0.56845C10.6833 0.634935 10.6833 0.734663 10.6167 0.801149L4.11667 7.28347C4.05 7.34996 3.95 7.34996 3.88333 7.28347Z"
                    fill="var(--Semantic-Static-white, #FFF)"
                  />
                </svg>
              </Box>
            }
            variant="contained"
            sx={{
              display: "flex",
              px: "8px",
              py: "4px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              borderRadius: "6px",
              background: "var(--Colors-blue-50, #287EFF)",
              boxShadow: "none",
              fontFamily: "SUIT Variable",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "20px",
              textAlign: "center",
              textTransform: "none",
              color: "var(--Semantic-Static-white, #FFF)",
              "& .MuiButton-startIcon": {
                marginRight: 0,
                marginLeft: 0,
              },
              "&:hover": {
                background: "var(--Colors-blue-50, #287EFF)",
              },
            }}
          >
            등록
          </Button>
        </Stack>

        <DataGridPro
          rows={playgroundRows}
          columns={columnsWithEdit}
          columnHeaderHeight={64}
          rowHeight={32}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handlePlaygroundSelection}
          rowSelectionModel={selection}
          processRowUpdate={processPlaygroundRowUpdate}
          getCellClassName={(params) => {
            if (params.row.section === "Error" && requiredFields.includes(params.field) &&
              (!params.value || params.value === "입력")) {
              return "cell-error";
            }
            return "";
          }}
          onColumnHeaderClick={(params) => {
            if (params.colDef?.field === "__check__") {
              togglePlaygroundCheckbox("__all__");
            }
          }}
          onCellClick={(params) => {
            if (params.field === "__check__") {
              togglePlaygroundCheckbox(params.id);
              return;
            }
            setFocusedPlayground(params.id);
          }}
          getRowClassName={playgroundRowClass}
          sx={{
            fontFamily: "SUIT Variable",
            "& .row-Enabled": { bgcolor: sectionColors.Enabled },
            "& .row-Focus": { bgcolor: sectionColors.Focus },
            "& .row-Edited": { bgcolor: sectionColors.Edited },
            "& .row-Error": { bgcolor: sectionColors.Error },
            "& .row-checked .MuiDataGrid-cell": {
              backgroundColor: checkedBg,
            },
            "& .cell-error": {
              border: "1px solid #DC0C0C !important",
            },
            "& .row-Edited .MuiDataGrid-cell": {
              display: "flex",
              padding: "6px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "var(--Colors-yellow-98, #FEF6E6)",
            },
            "& .row-Error .MuiDataGrid-cell": {
              display: "flex",
              padding: "6px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "var(--Colors-red-98, #FFF0F0)",
            },
            "& .row-focused .MuiDataGrid-cell": {
              display: "flex",
              padding: "6px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "rgba(40, 126, 255, 0.06)",
            },
            "& .row-sim-hover .MuiDataGrid-cell": {
              backgroundImage: `linear-gradient(0deg, ${overlayColor} 0%, ${overlayColor} 100%)`,
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#DEE1E8",
              color: "var(--Colors-grey-30, #444855)",
              fontWeight: 500,
              fontSize: 13,
              fontFamily: "SUIT Variable",
              lineHeight: "20px",
            },
            "& .MuiDataGrid-columnHeadersInner": {
              bgcolor: "#DEE1E8",
            },
            "& .MuiDataGrid-columnHeader": {
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "var(--Colors-grey-30, #444855)",
              fontFamily: "SUIT Variable",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            },
            // 헤더 체크박스 아이콘 강제 노출
            "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              margin: 0,
            },
            "& .MuiDataGrid-columnHeaderCheckbox svg": {
              width: 18,
              height: 18,
              color: "#6D6E70",
              display: "block",
            },
            "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
              transition: "background-color 0.25s ease, background-image 0.25s ease",
              color: "var(--Semantic-Static-black, #16171B)",
              textAlign: "left",
              fontFamily: "SUIT Variable",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              padding: "6px 12px",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "8px",
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "var(--Semantic-Static-white, #FFF)",
              color: "var(--Semantic-Static-black, #16171B)",
              fontFamily: "SUIT Variable",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: "0 0 auto",
            },
            "& .MuiDataGrid-row": {
              transition: "background-color 0.25s ease, background-image 0.25s ease",
            },
            "& .MuiDataGrid-cell--editing": {
              borderRight:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              borderBottom:
                "1px solid var(--Colors-black_opacity-black_opacity8, rgba(22, 23, 27, 0.08))",
              background: "rgba(40, 126, 255, 0.06)",
              boxSizing: "border-box",
              minWidth: 0,
              overflow: "hidden",
            },
            "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
              backgroundColor: "inherit",
              backgroundImage: `linear-gradient(0deg, ${overlayColor} 0%, ${overlayColor} 100%)`,
            },
            "& .row-Focus:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Focus,
              backgroundImage: `linear-gradient(0deg, ${overlayColor} 0%, ${overlayColor} 100%)`,
            },
            "& .row-Edited:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Edited,
              backgroundImage: `linear-gradient(0deg, ${overlayColor} 0%, ${overlayColor} 100%)`,
            },
            "& .row-Error:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Error,
              backgroundImage: `linear-gradient(0deg, ${overlayColor} 0%, ${overlayColor} 100%)`,
            },
            height: 500,
          }}
        />
        <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end", fontFamily: "SUIT Variable", fontSize: 13, fontWeight: 500, color: "#16171B" }}>
          합계: {playgroundRows.length}건
        </Box>
      </Box>
    </Box>
  );
}
