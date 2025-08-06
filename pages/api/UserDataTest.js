export default function testData(req, res) {
    const data = [
        { id: 1, GroupName: 'ViecHay3656', GroupState: 'Public', Member: 300, State: 'Chưa tham gia'},
        { id: 2, GroupName: 'Timviec6s', GroupState: 'Private', Member: 20, State: 'Chua tham gia'},
    ];

    res.status(200).json(data);
}