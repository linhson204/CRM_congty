
                                                    <div className={`${style.BlockRow}`} style={{marginLeft: 'auto'}}>
                                                        {/* them list danh sách các nhóm trong queue thay phan compare */}
                                                        {Sent && privateGrSelected === group.id ?  
                                                        (
                                                            <div className={style.BlockRow}>
                                                                <button className={style.buttonOutGr} 
                                                                        style={{marginRight: '10px'}}
                                                                        onClick={() => {setShowCancelQueuePopUp(true);}}>
                                                                            Huỷ bỏ
                                                                </button>
                                                                <div className={style.BlockRow}>
                                                                    <div className={`${style.BlockRow} ${style.onQueue}`}>
                                                                        <HiMiniQueueList style={{marginRight: '7px'}} className={style.ic}></HiMiniQueueList>
                                                                        <p style={{paddingTop: '2px'}}>Đang chờ duyệt</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </div>	