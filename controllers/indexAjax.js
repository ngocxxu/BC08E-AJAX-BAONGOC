function layDSNhanVienApi() {
	var promise = axios({
		url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
		method: 'GET',
		responseType: 'json',
	});

	promise.then(function (result) {
		console.log('result', result.data);
		renderTableNhanVien(result.data);
	});
	promise.catch(function (error) {
		console.log('error', error);
	});
}
layDSNhanVienApi();

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

	var promise = axios({
		url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
		method: 'POST',
		data: nhanVien,
	});
	promise.then(function (result) {
		console.log('result', result.data);
		layDSNhanVienApi();
	});
	promise.catch(function (error) {
		console.log(error.response.data);
	});
};

function xoaNhanVien(maNhanVien) {
	var promise = axios({
		url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
		method: 'DELETE',
	});
	promise.then(function (result) {
		console.log(result.data);
		layDSNhanVienApi();
	});
	promise.catch(function (error) {
		console.log(error.response.data);
	});
}

function chinhSuaNhanVien(maNhanVienClick) {
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#btnThemNhanVien').disabled = true;
    document.querySelector('#btnCapNhat').disabled = false;

	console.log(maNhanVienClick);
	var promise = axios({
		url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVienClick}`,
		method: 'GET',
	});
	promise.then(function (result) {
		var nv = result.data;
        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value = nv.heSoChucVu;
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
});
	promise.catch(function (error) {
		//hiển thị lỗi do BE trả ra
		console.log(error.response.data);
	});
}

document.querySelector('#btnCapNhat').onclick = function () {
    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#btnThemNhanVien').disabled = false;
    document.querySelector('#btnCapNhat').disabled = true;

	var nhanVienUpdate= new NhanVien();
	nhanVienUpdate.maNhanVien=document.querySelector('#maNhanVien').value;
	nhanVienUpdate.tenNhanVien=document.querySelector('#tenNhanVien').value;
	nhanVienUpdate.heSoChucVu=document.querySelector('#chucVu').value;
	var slChucVu = document.querySelector('#chucVu');
    var viTriOptionChon = slChucVu.selectedIndex; //Lấy ra vị trí của thẻ option được chọn từ selec
    nhanVienUpdate.chucVu = slChucVu[viTriOptionChon].innerHTML;
	nhanVienUpdate.luongCoBan=document.querySelector('#luongCoBan').value;
	nhanVienUpdate.soGioLamTrongThang=document.querySelector('#soGioLamTrongThang').value;
  
    //gửi dữ lịu từ server
    var promise = axios({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVienUpdate}`,
      method: 'PUT',
      data: nhanVienUpdate,
    });
  
    promise.then(function (result) {
      console.log(result.data);
      layDSNhanVienApi();
    });
    promise.catch(function (error) {
      console.log(error.response.data);
    });
  };
  