export default function testData(req, res) {
    const data = [
        { id: 1, name: 'Nguyen Van A', friend: 741, GrIn: 91, GrOut: 35, Post: 492, Comment: 1037, isJoin: false, Mess: 12 },
        { id: 2, name: 'Tran Van B', friend: 137, GrIn: 147, GrOut: 35, Post: 1709, Comment: 714, isJoin: false, Mess: 200 },
        { id: 3, name: 'tran van b', friend: 112, GrIn: 149, GrOut: 3, Post: 1425, Comment: 517, isJoin: true },
        { id: 4, name: 'Nguyen Thi C', friend: 90, GrIn: 186, GrOut: 3, Post: 1791, Comment: 1379, isJoin: false },
        { id: 5, name: 'Viruss', friend: 118, GrIn: 98, GrOut: 16, Post: 1489, Comment: 1043, isJoin: true },
        { id: 6, name: 'Son Tung MTP', friend: 43, GrIn: 124, GrOut: 5, Post: 1223, Comment: 953, isJoin: true },
        { id: 7, name: 'MCK', friend: 82, GrIn: 124, GrOut: 33, Post: 299, Comment: 606, isJoin: false },
        { id: 8, name: 'Wrxdie', friend: 86, GrIn: 198, GrOut: 13, Post: 1571, Comment: 1014, isJoin: true },
        { id: 9, name: 'TrAn VAN B', friend: 124, GrIn: 275, GrOut: 19, Post: 1163, Comment: 998, isJoin: true },
        { id: 10, name: 'Tiến', friend: 30, GrIn: 147, GrOut: 4, Post: 1714, Comment: 956, isJoin: true },
        { id: 11, name: 'B van tran', friend: 148, GrIn: 269, GrOut: 6, Post: 1859, Comment: 856, isJoin: false },
        { id: 12, name: 'Nguyen AA', friend: 18, GrIn: 65, GrOut: 24, Post: 1213, Comment: 1401, isJoin: false }
    ];

    res.status(200).json(data);
}