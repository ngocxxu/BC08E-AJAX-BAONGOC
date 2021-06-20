function NhanVien(){
    this.maNhanVien = '',
    this.tenNhanVien = '',
    this.chucVu= '',
    this.heSoChucVu= '',
    this.luongCoBan= '',
    this.soGioLamTrongThang= '',
    this.tongLuong=function(){
        return (Number(this.luongCoBan)*Number(this.heSoChucVu));
    },
    this.xepLoaiNhanVien= function(){
        let hours=this.soGioLamTrongThang;
        if(hours>=50 && hours<=100){
            return 'Nhân viên giỏi';
        }else if(hours>100 && hours<=150){
            return 'Nhân viên xuất sắc';
        }else{
            return 'Unvalid';
        }
    }
}
