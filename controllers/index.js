var arrNhanVien = [];
var kiemTra = new Validation();
document.querySelector('#btnThemNhanVien').onclick = function () {
	var nhanVien = new NhanVien();
	nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
	nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
	nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
	var slChucVu = document.querySelector('#chucVu');
    var viTriOptionChon = slChucVu.selectedIndex; //Lấy ra vị trí của thẻ option được chọn từ selec
    nhanVien.chucVu = slChucVu[viTriOptionChon].innerHTML;
	nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
	nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

	var valid = true;
	valid &=
		kiemTra.kiemTraRong(nhanVien.maNhanVien, '#error_required_maNhanVien', 'Mã nhân viên') &
		kiemTra.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên nhân viên') &
		kiemTra.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCoBan', 'Lương cơ bản') &
		kiemTra.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_soGioLamTrongThang', 'Số giờ làm');
	valid &= kiemTra.kiemTraKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên');
	valid &=
		kiemTra.tatCaSo(nhanVien.maNhanVien, '#error_allNumber_maNhanVien', 'Mã nhân viên') &
		kiemTra.tatCaSo(nhanVien.luongCoBan, '#error_allNumber_luongCoBan', 'Lương cơ bản') &
		kiemTra.tatCaSo(nhanVien.soGioLamTrongThang, '#error_allNumber_soGioLamTrongThang', 'Số giờ làm');
	valid &= kiemTra.kiemTraDoDai(nhanVien.maNhanVien, '#error_min_max_length_maNhanVien', 4, 6, 'Mã nhân viên');
	valid &=
		kiemTra.kiemTraGiaTri(nhanVien.luongCoBan, '#error_min_max_number_luongCoBan', 1000000, 20000000, 'Lương cơ bản') &
		kiemTra.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_min_max_number_soGioLamTrongThang', 50, 150, 'Số giờ làm');

	arrNhanVien.push(nhanVien);
	renderTableNhanVien(arrNhanVien);
};

function renderTableNhanVien(arrNV) {
	var content = '';
	for (var i = 0; i < arrNV.length; i++) {
		var nv = arrNV[i];
		var nhanVien = new NhanVien();
		nhanVien.maNhanVien = nv.maNhanVien;
		nhanVien.tenNhanVien = nv.tenNhanVien;
		nhanVien.chucVu = nv.chucVu;
		nhanVien.heSoChucVu = nv.heSoChucVu;
		nhanVien.luongCoBan = nv.luongCoBan;
		nhanVien.soGioLamTrongThang = nv.soGioLamTrongThang;

		var trNhanVien = `
        <tr>
        <td>${nhanVien.maNhanVien}</td>
        <td>${nhanVien.tenNhanVien}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.luongCoBan}</td>
        <td>${nhanVien.tongLuong()}</td>
        <td>${nhanVien.soGioLamTrongThang}</td>
        <td>${nhanVien.xepLoaiNhanVien()}</td>
        <td><button onclick="xoaNhanVien('${nhanVien.maNhanVien}')" class="btn btn-danger">Xoá</button>
        </td>
        <td><button onclick="chinhSuaNhanVien('${nhanVien.maNhanVien}')" class="btn btn-success">Chỉnh sửa</button>
        </td>
    </tr>
`;
		content += trNhanVien;
	}
	document.querySelector('#tblNhanVien').innerHTML = content;
}

function chinhSuaNhanVien(maNhanVienClick){
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#btnThemNhanVien').disabled = true;
    document.querySelector('#btnCapNhat').disabled = false;

    for(var i=0;i<arrNhanVien.length;i++){
        var nv=arrNhanVien[i];
        if(nv.maNhanVien === maNhanVienClick){
            document.querySelector('#maNhanVien').value = nv.maNhanVien;
            document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
            document.querySelector('#chucVu').value = nv.heSoChucVu;
            document.querySelector('#luongCoBan').value = nv.luongCoBan;
            document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
        }
		
    }
}

function xoaNhanVien(maNVClick) {
	for (var i = arrNhanVien.length - 1; i >= 0; i--) {
		var nv = arrNhanVien[i];
		if (nv.maNhanVien === maNVClick) {
			arrNhanVien.splice(i, 1);
		}
	}
	renderTableNhanVien(arrNhanVien);
}

document.querySelector('#btnCapNhat').onclick = function() {
	var nhanVienUpdate= new NhanVien();
	nhanVienUpdate.maNhanVien=document.querySelector('#maNhanVien').value;
	nhanVienUpdate.tenNhanVien=document.querySelector('#tenNhanVien').value;
	nhanVienUpdate.heSoChucVu=document.querySelector('#chucVu').value;
	var slChucVu = document.querySelector('#chucVu');
    var viTriOptionChon = slChucVu.selectedIndex; //Lấy ra vị trí của thẻ option được chọn từ selec
    nhanVienUpdate.chucVu = slChucVu[viTriOptionChon].innerHTML;
	nhanVienUpdate.luongCoBan=document.querySelector('#luongCoBan').value;
	nhanVienUpdate.soGioLamTrongThang=document.querySelector('#soGioLamTrongThang').value;

	for (var i = 0; i <arrNhanVien.length; i++){
		var nhanVienTrongMang= arrNhanVien[i];
		if(nhanVienTrongMang.maNhanVien === nhanVienUpdate.maNhanVien){
			nhanVienTrongMang.tenNhanVien=nhanVienUpdate.tenNhanVien;
			nhanVienTrongMang.chucVu=nhanVienUpdate.chucVu;
			nhanVienTrongMang.luongCoBan=nhanVienUpdate.luongCoBan;
			nhanVienTrongMang.soGioLamTrongThang=nhanVienUpdate.soGioLamTrongThang;
		}
	}
	renderTableNhanVien(arrNhanVien);

    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#btnThemNhanVien').disabled = false;
    document.querySelector('#btnCapNhat').disabled = true;
}


