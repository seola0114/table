import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const columns = [
  { field: "section", headerName: "상태 그룹", width: 120 },
  { field: "variant", headerName: "상태", width: 140 },
  {
    field: "checked",
    headerName: "선택",
    width: 90,
    renderCell: (params) => (
      <input
        type="checkbox"
        checked={params.value}
        onChange={() =>
          params.api.updateRows([{ id: params.id, checked: !params.value }])
        }
        style={{ width: 16, height: 16 }}
      />
    ),
  },
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

const baseRow = {
  checked: false, cost: "운송료", item: "입력", pickup: "입력", drop: "입력",
  rateSale: "입력", rateBuy: "입력", car: "입력", unitSale: "입력", unitBuy: "입력",
  unitOwn: "입력", unitOther: "입력", ton1Sale: "입력", ton1Buy: "입력",
  ton25: "입력", ton6: "입력", ton8: "입력", ton18: "입력", ton25W: "입력",
  franchise: "입력", chgSale: "입력", chgBuy: "입력", nodeUp: "입력", nodeDown: "입력",
};

const rows = [
  { id: 1, section: "Enabled", variant: "Enabled", no: 1, ...baseRow },
  { id: 2, section: "Enabled", variant: "Enabled + Hover", no: 2, ...baseRow },
  { id: 3, section: "Enabled", variant: "Enabled + Checked", no: 3, checked: true, ...baseRow },
  { id: 4, section: "Focus", variant: "Default", no: 4, ...baseRow },
  { id: 5, section: "Focus", variant: "Checked", no: 5, checked: true, ...baseRow },
  { id: 6, section: "Edited", variant: "Default", no: 6, ...baseRow },
  { id: 7, section: "Error", variant: "Default", no: 7, ...baseRow },
];

const sectionColors = {
  Enabled: "#fff",
  Focus: "hsla(216, 100%, 58%, 0.06)",
  Edited: "#fff7e7",
  Error: "#fff0f0",
};

function DropdownCell({ value }) {
  const [open, setOpen] = React.useState(false);
  const options = ["전체", "CL1", "기타"];
  return (
    <Box position="relative" display="inline-block">
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          px: 1.5, py: 0.75, border: "1px solid rgba(22,23,27,0.08)",
          borderRadius: "6px", bgcolor: "transparent", minWidth: 100,
          display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 1, cursor: "pointer",
          fontFamily: "SUIT Variable", fontSize: 13, fontWeight: 500, color: "#16171b",
        }}
      >
        {value}<span style={{ fontSize: 10 }}>▼</span>
      </Box>
      {open && (
        <Box sx={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 10,
          bgcolor: "#fff", outline: "1px solid #c9cdd7", boxShadow: "0 0 12px rgba(0,0,0,0.1)",
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
  const [data, setData] = React.useState(rows);
  const [playgroundRows, setPlaygroundRows] = React.useState(rows.slice(0, 3));
  const [selection, setSelection] = React.useState([]);
  const [focusedMain, setFocusedMain] = React.useState(null);
  const [focusedPlayground, setFocusedPlayground] = React.useState(null);

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
    console.log("등록 데이터", playgroundRows);
    alert("등록 완료 (콘솔 확인)");
  };

  const mainRowClass = React.useCallback(
    (params) => {
      let cls = `row-${params.row.section}`;
      if (params.row.checked) cls += " row-checked";
      if (params.id === focusedMain) cls += " row-focused";
      return cls;
    },
    [focusedMain]
  );

  const playgroundRowClass = React.useCallback(
    (params) => {
      let cls = `row-${params.row.section}`;
      if (params.row.checked) cls += " row-checked";
      if (params.id === focusedPlayground) cls += " row-focused";
      return cls;
    },
    [focusedPlayground]
  );

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Button variant="outlined" sx={{ mb: 1 }} onClick={() => setData(rows)}>
          리셋
        </Button>
        <DataGridPro
          rows={data}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          getRowClassName={mainRowClass}
          onCellClick={(params) => setFocusedMain(params.id)}
          sx={{
            fontFamily: "SUIT Variable",
            "& .row-Enabled": { bgcolor: sectionColors.Enabled },
            "& .row-Focus": { bgcolor: sectionColors.Focus },
            "& .row-Edited": { bgcolor: sectionColors.Edited },
            "& .row-Error": { bgcolor: sectionColors.Error },
            "& .row-focused .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Focus,
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
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
            "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
              transition: "background-color 0.25s ease, background-image 0.25s ease",
            },
            "& .MuiDataGrid-row": {
              transition: "background-color 0.25s ease, background-image 0.25s ease",
            },
            // 기본 hover 오버레이
            "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
              backgroundColor: "inherit",
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
            },
            // Focus 기본일 때는 hover 오버레이 제거
            "& .row-Focus:not(.row-checked):hover .MuiDataGrid-cell": {
              backgroundImage: "none",
            },
            // Focus에서 체크된 경우에만 오버레이 유지
            "& .row-Focus.row-checked:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Focus,
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
            },
            "& .row-Edited:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Edited,
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
            },
            "& .row-Error:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Error,
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
            },
            height: 640,
          }}
        />
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1}>
            <Button startIcon={<AddIcon />} variant="outlined" onClick={addRow}>
              행 추가
            </Button>
            <Button startIcon={<DeleteIcon />} variant="outlined" color="error" onClick={deleteRows}>
              행 삭제
            </Button>
          </Stack>
          <Button startIcon={<SaveIcon />} variant="contained" onClick={saveRows}>
            등록
          </Button>
        </Stack>

        <DataGridPro
          rows={playgroundRows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => setSelection(ids)}
          rowSelectionModel={selection}
          onCellClick={(params) => setFocusedPlayground(params.id)}
          getRowClassName={playgroundRowClass}
          sx={{
            fontFamily: "SUIT Variable",
            "& .row-Enabled": { bgcolor: sectionColors.Enabled },
            "& .row-Focus": { bgcolor: sectionColors.Focus },
            "& .row-Edited": { bgcolor: sectionColors.Edited },
            "& .row-Error": { bgcolor: sectionColors.Error },
            "& .row-focused .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Focus,
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
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
            "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
              transition: "background-color 0.25s ease, background-image 0.25s ease",
            },
            "& .MuiDataGrid-row": {
              transition: "background-color 0.25s ease, background-image 0.25s ease",
            },
            // 기본 hover 오버레이
            "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
              backgroundColor: "inherit",
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
            },
            // Focus 기본일 때는 hover 오버레이 제거
            "& .row-Focus:not(.row-checked):hover .MuiDataGrid-cell": {
              backgroundImage: "none",
            },
            // Focus에서 체크된 경우에만 오버레이 유지
            "& .row-Focus.row-checked:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Focus,
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
            },
            "& .row-Edited:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Edited,
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
            },
            "& .row-Error:hover .MuiDataGrid-cell": {
              backgroundColor: sectionColors.Error,
              backgroundImage:
                "linear-gradient(0deg, hsla(228, 10%, 10%, 0.06) 0%, hsla(228, 10%, 10%, 0.06) 100%)",
            },
            height: 500,
          }}
        />
      </Box>
    </Box>
  );
}
