interface TimeParams {
    hours: number;
    minutes: number;
    seconds: number;
}
import { useUserStore } from '~/store/user'
import Swal from 'sweetalert2'
const myMixin = {

    data: () => ({
        sLoadingTxtGlobal: "Cargando Información...",
        sEmptyTxtGlobal: "No hay información disponible para mostrar.",
        sEmptyRowGlobal: "No hay información.",
        sAPIGlobal: "https://api.catchapp.mx/alfa/api/v1/sp",
        aMonths: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ] as string[],
        codeRulesGlobal: [
            (v: any) => !!v || "El codigo es requerido",
            (v: any) =>
                (v && v.length <= 20) ||
                "El codigo deben tener menos de 20 caracteres",
        ],
        nameRulesGlobal: [
            (v: any) => !!v || "Los nombres son requeridos",
            (v: any) =>
                (v && v.length <= 40) ||
                "Los nombres deben tener menos de 40 caracteres",
        ],
        nameSingularRulesGlobal: [
            (v: any) => !!v || "El nombre es requerido",
            (v: any) =>
                (v && v.length <= 40) ||
                "El nombre debe tener menos de 40 caracteres",
        ],
        nameBenefitRulesGlobal: [
            (v: any) => !!v || "El nombre es requerido",
            (v: any) =>
                (v && v.length <= 70) ||
                "El nombre debe tener menos de 70 caracteres",
        ],
        descriptionBenefitRulesGlobal: [
            (v: any) => !!v || "La descripción es requerida",
            (v: any) =>
                (v && v.length <= 250) ||
                "La descripción debe tener menos de 250 caracteres",
        ],
        lastnameRulesGlobal: [
            (v: any) => !!v || "Los apellidos son requeridos",
            (v: any) =>
                (v && v.length <= 40) ||
                "Los apellidos deben tener menos de 40 caracteres",
        ],
        lastnameSingularRulesGlobal: [
            (v: any) => !!v || "El apellido es requeridos",
            (v: any) =>
                (v && v.length <= 40) ||
                "El Apellido debe tener menos de 40 caracteres",
        ],
        addressRulesGlobal: [
            (v: any) => !!v || "La dirección es requerida",
            (v: any) =>
                (v && v.length <= 255) ||
                "La dirección debe tener menos de 255 caracteres",
        ],
        streetRulesGlobal: [
            (v: any) => !!v || "La calle y el número es requerida"
        ],
        stateRulesGlobal: [(v: any) => !!v || "El estado es requerido"],
        cityRulesGlobal: [
            (v: any) => !!v || "La ciudad es requerida",
            (v: any) =>
                (v && v.length <= 255) ||
                "La ciudad debe tener menos de 255 caracteres",
        ],
        zipRulesGlobal: [
            (v: any) => !!v || "el código postal es requerida",
            (v: any) =>
                (v && v.length <= 5) ||
                "El código postal debe tener menos de 5 caracteres",
        ],
        positionRulesGlobal: [
            (v: any) => !!v || "El puesto es requerido",
            (v: any) =>
                (v && v.length <= 40) ||
                "El puesto debe tener menos de 40 caracteres",
        ],
        nicknameRulesGlobal: [
            (v: any) => !!v || "El apodo es requerido",
            (v: any) =>
                (v && v.length <= 40) ||
                "El apodo debe tener menos de 40 caracteres",
        ],
        emailRulesGlobal: [
            (v: any) => !!v || "El correo electrónico es requerido",
            (v: any) =>
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
                "Favor de ingresar un correo electrónico correcto",
        ],
        phoneRulesGlobal: [
            (v: any) => !!v || "El teléfono es requerido",
            (v: any) => (v && v.length >= 12) || "El teléfono debe tener 10 caracteres",
        ],
        unitPriceRulesGlobal: [
            (v: any) => !!v || "El costo es requerido",
            (v: any) => /^\d{0,3}(,\d{3})*(\.\d{1,2})?$/.test(v) || 'El costo debe tener hasta dos decimales'
        ],
        stockRulesGlobal: [
            (v: any) => !!v || "El stock es requerido",
            (v: any) => /^\d+$/.test(v) || 'Solo se permiten números enteros positivos'
        ],
        desciprtionRulesGlobal: [
            (v: any) => !!v || "La descripción es requerida",
            (v: any) =>
                (v && v.length <= 255) ||
                "La descripción debe tener menos de 255 caracteres",
        ],
        specificationsRulesGlobal: [
            (v: any) => !!v || "Las especificaciones son requerida",
            (v: any) =>
                (v && v.length <= 255) ||
                "Las especificaciones deben tener menos de 255 caracteres",
        ],
        dateRangeRules: [(v: any) => !!v || "El rango de fecha es requerido"],
        dateRules: [(v: any) => !!v || "La fecha es requerida"],
        hourRangeRules: [(v: any) => !!v || "El rango de horas es requerido"],
        typeBenefitsRules: [(v: any) => !!v || "El tipo de beneficio es requerido"],
        typeCategoryRules: [(v: any) => !!v || "La categoría del beneficio es requerida"],
        locationRulesGlobal: [(v: any) => !!v || "La localización es requerido"],
        passwordRulesGlobal: [
            (v: any) => !!v || "La contraseña es requerida",
            (v: any) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(v) || 'La contraseña debe tener como mínimo 6 caracteres, una minúscula,una mayúscula y un caracter especial' // Validación para números y dos decimales
        ],
        priceRulesGlobal: [
            (v: any) => !!v || "El monto es requerido",
            (v: any) => /^\d{0,3}(,\d{3})*(\.\d{1,2})?$/.test(v) || 'El monto debe tener hasta dos decimales'
        ],

    }),
    methods: {

        setValidateError(oError: any) {
            let iCode = oError.response["_data"]?.code ?? 0;
            if (iCode === 401 || iCode === 403) {
                useUserStore().setLogout();
            }
            Swal.fire({
                title: "¡Error!",
                text: oError.response["_data"]?.message ?? '',
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        },
        // getCountryCallingCodeId(sCountrySelected: string) {
        //     return this.aCountryGlobal.find((e) => e.sValue === sCountrySelected).sId;
        // },
        parseObjGlobal(obj: object) {
            return JSON.parse(JSON.stringify(obj));
        },
        bEmptyObjGlobal(Obj: object) {
            if (Object.keys(Obj).length === 0) {
                return true;
            } else {
                return false;
            }
        },
        async getUrlToBlob(sUrl: string): Promise<any | null> {
            try {
                const response = await fetch(sUrl);
                const blob = await response.blob();
                const type = blob.type !== '' ? blob.type : 'image/png'

                // Generar un objeto File a partir del Blob
                const file = new File([blob], 'nombre_archivo.png', { type: type });

                const reader = new FileReader();

                return new Promise((resolve, reject) => {
                    reader.onload = (event) => {
                        const image = {
                            name: file.name,
                            url: sUrl,
                            file: file,
                        };
                        resolve(image);
                    };

                    reader.onerror = (error) => {
                        console.error('Error al leer la imagen:', error);
                        reject(null);
                    };

                    reader.readAsDataURL(file);
                });

            } catch (error) {
                console.error('Error al convertir la imagen en FileList:', error);
                return null;
            }
        },
        async getUrlToBlobSize(sUrl: string): Promise<any | null> {
            try {
                const response = await fetch("https://cdn.pixabay.com/photo/2015/11/26/22/28/woman-1064664_1280.jpg");
                const blob = await response.blob();
                const type = blob.type !== '' ? blob.type : 'image/png'

                // Generar un objeto File a partir del Blob
                const file = new File([blob], 'nombre_archivo.png', { type: 'type' });

                const reader = new FileReader();

                return new Promise((resolve, reject) => {
                    reader.onload = (event) => {
                        const image = {
                            name: file.name,
                            url: sUrl,
                            file: file,
                        };
                        resolve(image);
                    };

                    reader.onerror = (error) => {
                        console.error('Error al leer la imagen:', error);
                        reject(null);
                    };

                    reader.readAsDataURL(file);
                });

            } catch (error) {
                console.error('Error al convertir la imagen en FileList:', error);
                return null;
            }
        },
        getMaskedFileGlobal: function (oFile: any) {
            if (oFile !== undefined) {
                const objectURL = URL.createObjectURL(oFile);
                return objectURL;
            }
        },
        getFormatMoneyGlobal(iNumber: Number) {
            let convert_number = Number(iNumber).toFixed(2);
            return convert_number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getFlagCountryGlobal(sCountryCallingCodeOrigin: string) {

            switch (sCountryCallingCodeOrigin?.toString() ?? '') {
                case "2":
                    return "/img/countrys/flag-mexico.png";
                case "1":
                    return "/img/countrys/flag-united-states.png";

                default:
                    return "";
            }
        },
        getFormatNumberGlobal(value: any) {
            if (value !== null) {
                // Eliminar cualquier caracter no numérico excepto comas y puntos decimales
                value = value.replace(/[^\d,.]/g, '');

                // Remover comas existentes para formatear correctamente
                value = value.replace(/,/g, '');

                // Dividir el número en partes enteras y decimales
                const parts = value.split('.');
                let formattedValue = '';

                // Formatear la parte entera con comas
                if (parts[0]) {
                    formattedValue = parseInt(parts[0], 10).toLocaleString();
                }

                // Agregar la parte decimal si existe
                if (parts.length > 1) {
                    formattedValue += `.${parts[1]}`;
                }

                value = formattedValue;
            }
            return value;
        },
        setLowerCaseGlobal(value: any) {
            if (value !== null) {
                value = value.toLowerCase();
            }
            return value;

        },
        getFormatPhoneNumberGlobal(value: any) {
            if (value !== null) {
                // Eliminar cualquier caracter no numérico
                value = value.replace(/[^\d]/g, '');

                // Aplicar el formato de teléfono (###-###-####)
                let formattedValue = '';
                if (value.length > 0) {
                    formattedValue += value.substr(0, 3);
                }
                if (value.length > 3) {
                    formattedValue += '-' + value.substr(3, 3);
                }
                if (value.length > 6) {
                    formattedValue += '-' + value.substr(6, 4);
                }
                return formattedValue;
            }
            return value;
        },
        getColorProsecution(value: string) {
            switch (value) {
                case "Procesado":
                    return "content-prosecution-indicted";
                case "No procesado":
                    return "content-prosecution-not-processed";
                case "Borrador":
                    return "content-prosecution-draft";
                default:
                    return "content-prosecution-draft";
            }
        },
        getColorStatusLotsGlobal(value: string) {
            switch (value) {
                case "En curso":
                    return "content-status-processing";
                case "Finalizado":
                    return "content-status-finally";
                default:
                    return "content-status-default";
            }
        },
        getColorStatusProcessingsGlobal(value: string) {
            switch (value) {
                case "Procesando":
                    return "content-status-processing";
                case "Finalizado":
                    return "content-status-finally";
                default:
                    return "content-status-default";
            }
        },
        getFormatDDMMYYYY(sDate: any, bHours: boolean) {
            var sDay = sDate.getDate();
            var sMonth = sDate.getMonth() + 1; // Los sMonthes son indexados desde 0
            var sYear = sDate.getFullYear();
            var sHours = sDate.getHours();
            var sMinutes = sDate.getMinutes();

            // Asegurarse de que el día y el sMonth tengan dos dígitos
            if (sDay < 10) {
                sDay = '0' + sDay;
            }
            if (sMonth < 10) {
                sMonth = '0' + sMonth;
            }
            if (sHours < 10) {
                sHours = '0' + sHours;
            }
            if (sMinutes < 10) {
                sMinutes = '0' + sMinutes;
            }
            return `${sDay}-${sMonth}-${sYear}` + (bHours ? ` a las ${sHours}:${sMinutes}` : '');
        },
        getHours(sDate: any) {
            var sHours = sDate.getHours();
            var sMinutes = sDate.getMinutes();
            if (sHours < 10) {
                sHours = '0' + sHours;
            }
            if (sMinutes < 10) {
                sMinutes = '0' + sMinutes;
            }
            return `${sHours}:${sMinutes}`;

        },
        getFormatYYYYMMDD(sDate: any) {
            const aDate = sDate.split('-');

            var sDay = aDate[0];
            var sMonth = aDate[1];
            var sYear = aDate[2];

            return `${sYear.trim()}-${sMonth.trim()}-${sDay.trim()}`;
        },
        getFormatYYYYMMDDHrsTogether(sIdent: string, sDate: any) {
            var sDay = sDate.getDate();
            var sMonth = sDate.getMonth() + 1; // Los sMonthes son indexados desde 0
            var sYear = sDate.getFullYear();
            var sHours = sDate.getHours();
            var sMinutes = sDate.getMinutes();
            var sSeconds = sDate.getSeconds();

            return `${sIdent}-${sYear}${sMonth}${sDay}${sHours}${sMinutes}${sSeconds}`
        },
        getNewDate(sDate: any) {
            return sDate
        },
        getNewDateTimeGlobal(bDefault: Boolean, aTime: TimeParams[]) {
            if (bDefault) {
                return `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} ~ ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
            } else {
                return `${aTime[0].hours.toString().padStart(2, '0')}:${aTime[0].minutes.toString().padStart(2, '0')} ~ ${aTime[1].hours.toString().padStart(2, '0')}:${aTime[1].minutes.toString().padStart(2, '0')}`
            }
        },
        getNewDateTimeFormatGlobal(fechaOriginal: string) {
            const fecha = new Date(fechaOriginal);

            // Obtener los componentes individuales de la fecha
            var year = fecha.getFullYear();
            var month = ('0' + (fecha.getMonth() + 1)).slice(-2);
            var day = ('0' + fecha.getDate()).slice(-2);
            var hours = ('0' + fecha.getHours()).slice(-2);
            var minutes = ('0' + fecha.getMinutes()).slice(-2);
            var seconds = ('0' + fecha.getSeconds()).slice(-2);
            var milliseconds = ('00' + fecha.getMilliseconds()).slice(-3);
            var timeZoneOffset = fecha.getTimezoneOffset() / 60;
            var timeZoneOffsetString = (timeZoneOffset > 0 ? "-" : "+") + ('0' + Math.abs(timeZoneOffset)).slice(-2);

            // Formatear la fecha en el nuevo formato
            var fechaFormateada = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds + timeZoneOffsetString;


            const cadenaFormateada = `${fecha.toISOString().slice(0, 19)}.${('00' + fecha.getMilliseconds()).slice(-3)}${(fecha.getTimezoneOffset() > 0 ? '-' : '+') + ('0' + Math.abs(fecha.getTimezoneOffset() / 60)).slice(-2)}:00`;

            return fechaFormateada;
        },
        getDateAndHr(sDate: String, oTime: TimeParams) {
            let aDateTemp = this.getNewDateTimeFormatGlobal(
                new Date(sDate.toString()).toString()
            ).split(" ");

            let sTimeTemp = `${oTime?.hours
                .toString()
                .padStart(2, "0")}:${oTime?.minutes
                    .toString()
                    .padStart(2, "0")}:00.${aDateTemp[1].split(".")[1]}`;

            let sDateTemp = aDateTemp[0]
            return `${sDateTemp} ${sTimeTemp}`
        },
        getInitialWordGlobal(sName: string, sLastName: string) {

            return `${sName.substr(0, 1).toUpperCase()}${sLastName.substr(0, 1).toUpperCase()}`
        },
        getNameProviderGlobal(aValue: any, bWithSlash: boolean) {
            let sSlash = bWithSlash === undefined ? ' / ' : ' ';
            const aValueTemp = aValue.map((e: any) => {
                return e.sValue
            }).join()

            return aValueTemp.replaceAll(",", sSlash)
        },
        getFormatMoneyToDecimal(sValue: String) {
            return sValue.replaceAll("$", "").replaceAll(",", "").replaceAll("MXN", "").replaceAll("Kg", "")
        },
        getIdRandomGlobal() {
            const sTime = new Date().getTime();
            const sRandom = Math.floor(Math.random() * 10000);

            const sId = `${sTime}-${sRandom}`;
            return sId;

        },
        getAbbreviationLetter(sText: String) {
            // Verificar si la entrada es una cadena de texto no vacía
            if (typeof sText !== 'string' || sText.trim() === '') {
                console.error('Entrada inválida. Proporciona una cadena de sText no vacía.');
                return '';
            }

            // Dividir la cadena en palabras
            var words = sText.split(/\s+/);

            // Tomar la primera letra de cada palabra
            var sAbbreviation = words.map(function (word) {
                return word.slice(0, 3);
            }).join('');

            return sAbbreviation;
        },
        getStatusBenefits(sStatus: String) {
            switch (sStatus) {
                case "programmed":

                    return 0;
                case "active":

                    return 1;
                case "canceled":

                    return 4;
                case "finished":

                    return 3;
                case "out of stock":

                    return 2;

                default:
                    return 0;
            }
        },
        getStatusNameBenefits(sStatus: String) {
            switch (sStatus) {
                case "programmed":

                    return 'Programado';
                case "active":

                    return 'Publicado';
                case "canceled":

                    return 'Cancelado';
                case "finished":

                    return "Finalizado";
                case "out of stock":

                    return "Sin stock";

                default:
                    return 0;
            }
        },
        getStatusColorBenefits(sStatus: String) {
            switch (sStatus) {
                case "programmed":
                    return {
                        ['background-color']: "#FF8A00",
                        color: "#FFFFFF"
                    };
                case "active":
                    return {
                        ['background-color']: "#86C157",
                        color: "#FFFFFF"
                    };
                case "canceled":
                    return {
                        ['background-color']: "#C62C2C",
                        color: "#FFFFFF"
                    };
                case "finished":
                    return {
                        ['background-color']: "#86C157",
                        color: "#FFFFFF"
                    };
                case "out of stock":
                    return {
                        ['background-color']: "#FCF538",
                        color: "#000000"
                    };

                default:
                    return 0;
            }
        },
        getIconStatusBenefits(sStatus: String) {
            switch (sStatus) {
                case "gift":

                    return 'mdi mdi-gift-outline';
                case "discount":

                    return "mdi mdi-percent-outline";
                case "promotion":

                    return 'mdi mdi-tag-multiple-outline';

                default:
                    return '';
            }
        },
        getBenefitTypeName(sName: String) {
            switch (sName) {
                case "gift":
                    return 'Regalo';
                case "promotion":
                    return 'Promoción';
                case "discount":
                    return 'Descuento';
                default:
                    return 'Sin información';
            }
        },
        getBenefitStatusName(sName: String) {
            switch (sName) {
                case "active":
                    return 'ACTIVADO';
                case "canceled":
                    return 'CANCELADO';
                case "completed":
                    return 'COMPLETO';
                case "expired":
                    return 'CADUCADO';
                case "incompleted":
                    return 'INCOMPLETO';
                case "redeemed":
                    return 'CANJEADO';
                default:
                    break;
            }
        },
        // Interacciones beneficio
        getBenefitStatusColors(sName: String) {
            switch (sName) {
                case "active":
                    return {
                        ['background-color']: "#DFF6FF",
                        color: "#34C4FF"
                    };
                case "canceled":
                    return {
                        ['background-color']: "#C62C2C",
                        color: "#FFFFFF"
                    };
                case "completed":
                    return {
                        ['background-color']: "#F1FFE5",
                        color: "#86C157"
                    };
                case "incompleted":
                    return {
                        ['background-color']: "#FFDFDF",
                        color: "#C62C2C"
                    };
                case "expired":
                    return {
                        ['background-color']: "#FFDFDF",
                        color: "#C62C2C"
                    };
                case "redeemed":
                    return {
                        ['background-color']: "#FFE4BB",
                        color: "#FF8A00"
                    };
                default:
                    return {
                        ['background-color']: "#000000",
                        color: "#FFFFFF"
                    };
            }
        },
        getBkColorBenefit(sName: String) {
            switch (sName) {
                case "active":
                    return {
                        ['background-color']: "#34C4FF",
                        color: "#34C4FF"
                    };
                case "canceled":
                    return {
                        ['background-color']: "#C62C2C",
                        color: "#FFFFFF"
                    };
                case "completed":
                    return {
                        ['background-color']: "#86C157",
                    };
                case "incompleted":
                    return {
                        ['background-color']: "#C62C2C",
                        color: "#C62C2C"
                    };
                case "expired":
                    return {
                        ['background-color']: "#C62C2C",
                        color: "#C62C2C"
                    };
                case "redeemed":
                    return {
                        ['background-color']: "#FF8A00",
                        color: "#FF8A00"
                    };
                default:
                    return {
                        ['background-color']: "#000000",
                        color: "#000000"
                    };
            }
        },
        getFormatPhoneGlobal(sCountryCallingCode: String, sPhone: String, sExt: String) {
            let sExtTemp = `${sExt ? `.Ext ${sExt}` : ''}`
            let sPhoneTemp = sPhone.substring(0, 3) + '-' + sPhone.substring(3, 6) + '-' + sPhone.substring(6);
            return `+${sCountryCallingCode} ${sPhoneTemp} ${sExtTemp}`
        },
        getPercentGlobal(iValue: number = 0, iTotal: number = 100): string {
            // Convierte los valores a números
            iValue = Number(iValue);
            iTotal = Number(iTotal);

            // Verifica si iTotal es cero
            if (iTotal === 0) {
                return '0.00'; // Retorna '0.00' si iTotal es cero para evitar divisiones por cero
            }

            // Calcula el porcentaje
            let Percent = (iValue / iTotal) * 100;

            // Asegúrate de que el Percent esté entre 0 y 100
            if (Percent > 100) {
                Percent = 100;
            } else if (Percent < 0) {
                Percent = 0;
            }

            // Redondea el porcentaje a 2 decimales y conviértelo a string
            let roundedPercent = Percent.toFixed(2);

            return roundedPercent;
        },
        getAdmissionStatusName(sName: String) {
            switch (sName) {
                case "pending":
                    return 'PENDIENTE';
                case "processing":
                    return 'EN TRAMITE';
                case "rejected":
                    return 'CANCELADO';
                case "accepted":
                    return 'APROBADO';
                default:
                    return sName;
            }
        },
        getAdmissionStatusColors(sName: String) {
            switch (sName) {
                case "pending":
                    return {
                        ['background-color']: "#FCF538",
                        color: "#000000"
                    };
                case "processing":
                    return {
                        ['background-color']: "#FF8A00",
                        color: "#FFFFFF"
                    };
                case "rejected":
                    return {
                        ['background-color']: "#C62C2C",
                        color: "#FFFFFF"
                    };
                case "accepted":
                    return {
                        ['background-color']: "#86C157",
                        color: "#FFFFFF"
                    };

                default:
                    return {
                        ['background-color']: "#000000",
                        color: "#FFFFFF"
                    };
            }
        },
        getStatusColorPayment(sStatus: String) {
            switch (sStatus) {

                case "completed":
                    return {
                        ['background-color']: "#86C157",
                        color: "#FFFFFF"
                    };
                case "pending":
                    return {
                        ['background-color']: "#ffea00",
                        color: "#000000"
                    };
                case "failed":
                    return {
                        ['background-color']: "#FFC2C2",
                        color: "#C62C2C"
                    };
                default:
                    return {
                        ['background-color']: "#C62C2C",
                        color: "#FFFFFF"
                    };
            }
        },
        getPaymentStatusName(sName: String) {
            switch (sName) {
                case "completed":
                    return "Completado";
                case "pending":
                    return "Pendiente";
                case "failed":
                    return 'Fallida'
                default:
                    break;
            }
        },
        getTitleCaseGlobal(sTitle: String) {
            return sTitle[0].toUpperCase() + sTitle.substring(1).toLowerCase()
        },
        getMonthGlobal(iMonth: number): string | undefined {
            return this.aMonths.find((_, i) => i === iMonth);
        },
        getNameDaysGlobal(sDays: String) {
            switch (sDays) {
                case 'sunday':
                    return 'Domingo';
                case 'monday':
                    return 'Lunes';
                case 'tuesday':
                    return 'Martes';
                case 'wednesday':
                    return 'Miércoles';
                case 'thursday':
                    return 'Jueves';
                case 'friday':
                    return 'Viernes';
                case 'saturday':
                    return 'Sábado';
                default:
                    return sDays;
            }
        }
    }
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.mixin(myMixin);
});

