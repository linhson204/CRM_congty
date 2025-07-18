import { List } from "antd"
import { useContext, useEffect, useState } from "react"
import { DxhdDetailContext } from "../dxhd_detail_context"
import { getPropOrDefault } from "../utils"
import dayjs from "dayjs"

interface DataType {
    key: React.Key,
    object: string,
    action: string,
    user: string,
    created_at: string,
}

export default function DxhdDetailDiary() {
    const { dxhdDetailDiary } = useContext(DxhdDetailContext)
    const [diary, setDiary] = useState<DataType[]>([])

    useEffect(() => {
        if (dxhdDetailDiary.length > 0) {
            convertToDiary(dxhdDetailDiary)
        }
    }, [dxhdDetailDiary])

    const convertToDiary = (data: []) => {
        let newData: DataType[] = []
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const newItem: DataType = {
                key: i + 1,
                object: getPropOrDefault(element, 'object', ''),
                action: getPropOrDefault(element, 'action', 'Chưa cập nhật'),
                created_at: getPropOrDefault(element, 'created_at', '') !== '' ?
                    dayjs(getPropOrDefault(element, 'created_at')).format('DD/MM/YYYY - HH:mm:ss') : '',
                user: `${getPropOrDefault(element, 'user.userName', 'Chưa cập nhật')} (${getPropOrDefault(element, 'user.id', 0)})`
            }
            newData.push(newItem)
        }
        setDiary(newData)
    }

    return (
        <List
            className=""
            style={{
                maxHeight: '200px',
                overflow: 'auto',
            }}
            dataSource={diary}
            renderItem={(item: DataType, index) => (
                <List.Item key={item.key}>
                    <List.Item.Meta
                        className=""
                        title={`${item.created_at} - ${item.user}`}
                        description={
                            <div 
                            className=""
                            style={{
                                color: 'black'
                            }}
                            >
                                {`${item.action} ${item.object}`}
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    )
}