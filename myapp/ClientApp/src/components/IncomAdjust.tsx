import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as Yup from 'yup';
import { Context } from './Context';
import { idList } from './../App';
import { yupResolver } from '@hookform/resolvers/yup';

interface IncomAdjustDatas {
    radioGroup: string;
    dependentsNum: string;
    dependentsDB: string;
    dependentsName: string;
    dependentsRuby: string;
    dependentsAdr: string;
    dependentsRel: string;
    dependentsInc: string;
    dependentsPrsEvid: string;
}

const incomeAdjustSchema = Yup.object().shape({
    radioGroup: Yup.string().required('入力必須です'),
    dependentsNum: Yup.string().matches(/^[0-9]{12}$/, { message: '12桁の数字を入力してください', excludeEmptyString: true }),
    dependentsDB: Yup.string().matches(/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, { message: 'xxxx/xx/xx（数字）の形で入力してください', excludeEmptyString: true }),
    dependentsName: Yup.string().matches(/^(.+?)[\s　]+(.+)$/, { message: 'xx xxで入力してください', excludeEmptyString: true }),
    dependentsRuby: Yup.string().matches(/^[ァ-ヶー]+[\s　][ァ-ヶー]+$/, { message: 'xx xx（半角カタカナ）で入力してください', excludeEmptyString: true }),
    dependentsAdr: Yup.string().typeError('入力が間違っています'),
    dependentsRel: Yup.string().matches(/^(夫|妻|親|父|母|子|息子|長男|次男|娘|長女|次女|孫|祖父|祖母|兄|姉|弟|妹|おじ|おば|いとこ|はとこ)$/, { message: '正しい続柄で入力してください', excludeEmptyString: true }),
    dependentsInc: Yup.string().matches(/^[0-9]+$/, { message: '数字を入力してください', excludeEmptyString: true }),
    dependentsPrsEvid: Yup.string().typeError('入力が間違っています'),
})

function IncomeAdjust(props: any)  {
    const { control, handleSubmit, formState:{ errors }, getValues, reset } = useForm<IncomAdjustDatas>({
        defaultValues: {
            radioGroup: '0',
            dependentsNum: '',
            dependentsDB: '',
            dependentsName: '',
            dependentsRuby: '', 
            dependentsAdr: '',
            dependentsRel: '',
            dependentsInc: '',
            dependentsPrsEvid: '',
        },
        resolver: yupResolver(incomeAdjustSchema)
    });
    const { currentState, setCurrentState } = React.useContext(Context);
    useEffect(() => {
        var url: string = '/api/infoinput/getincomeadjust/' + idList.id;
        axios.get(url).then((res) => {
            reset(res.data);
            console.log(res.data);
        });
    }, [reset]);
    const onSubmit = (action: any) => {
        if (action === 'back') {
            props.handleBack();
        } else {
            props.handleNext();
        }
        const data = getValues();
        setCurrentState({...currentState, 'IncomeAdjust': data});
    }
    return (

          <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
                <li>年末調整において所得金額調整控除の適用を受けようとする場合は、「要件」欄の概要する項目に「1」を入力（選択）し、その項目に応じて「★扶養親族等」欄及び「☆特別障碍者」欄にその該当する者について入力してください</li>
                <li>年末調整における所得金額調整控除の額については給与の支払い者が計算しますので、この申告書に所得金額調整控除の額を入力する欄はありません</li>
            </ul>
            <Controller
                control={control}
                name="radioGroup"
                render={({ field: {onChange, value} }) => ( 
                    <RadioGroup aria-label="requirement" value={value} onChange={onChange}>
                         <FormControl error>
                            <FormControlLabel value="0" control={<Radio />} label="なし" />
                            <FormControlLabel value="1" control={<Radio />} label="あなた自身が特別障害者" />
                            <FormControlLabel value="2" control={<Radio />} label="同一生計配偶者が特別障害者" />
                            <FormControlLabel value="3" control={<Radio />} label="扶養親族が特別障害者" />
                            <FormControlLabel value="4" control={<Radio />} label="扶養親族が年齢23歳未満(平10.1.2以後生)" />
                            <FormHelperText>
                                    { errors.radioGroup?.message }
                            </FormHelperText>
                        </FormControl>
                    </RadioGroup>
                )}
            />
            <FormHelperText>特別障碍者が含まれる項目を選択した場合★を記載し、同一生計者・扶養親族が含まれる項目を選択した場合☆を記載する。</FormHelperText>

            <Typography variant="h5">☆扶養親族等</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Controller
                        render={({ field }) => <TextField label="個人番号" fullWidth margin="normal" error={errors.dependentsNum ? true : false} helperText={errors.dependentsNum?.message} {...field} />}
                        name="dependentsNum"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => <TextField label="生年月日" fullWidth margin="normal" error={errors.dependentsDB ? true : false} helperText={errors.dependentsDB?.message} {...field} />}
                        name="dependentsDB"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => <TextField label="名前" fullWidth margin="normal" error={errors.dependentsName ? true : false} helperText={errors.dependentsName?.message} {...field} />}
                        name="dependentsName"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => <TextField label="ナマエ" fullWidth margin="normal" error={errors.dependentsRuby ? true : false} helperText={errors.dependentsRuby?.message} {...field} />}
                        name="dependentsRuby"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => <TextField label="住所" fullWidth margin="normal" error={errors.dependentsAdr ? true : false} helperText={errors.dependentsAdr?.message} {...field} />}
                        name="dependentsAdr"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => <TextField label="続柄" fullWidth margin="normal" error={errors.dependentsRel ? true : false} helperText={errors.dependentsRel?.message} {...field} />}
                        name="dependentsRel"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => <TextField label="所得金額" fullWidth margin="normal" error={errors.dependentsInc ? true : false} helperText={errors.dependentsInc?.message} {...field} />}
                        name="dependentsInc"
                        control={control}
                    />

                    <Typography variant="h5">★特別障害者</Typography>
                    <Controller
                        render={({ field }) => <TextField label="該当する証明" fullWidth margin="normal" error={errors.dependentsPrsEvid ? true : false} helperText={errors.dependentsPrsEvid?.message} {...field} />}
                        name="dependentsPrsEvid"
                        control={control}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSubmit("back")}
                    >
                        戻る
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        次へ
                    </Button>
                </Grid>
            </Grid>
          </form>      
    );
}

export default IncomeAdjust;