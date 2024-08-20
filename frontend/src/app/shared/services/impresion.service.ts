import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  constructor() { }

  imprimir(entidad: string, encabezado: string[], cuerpo: Array<any>, titulo: string, guardar?: boolean) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const logoImg = new Image();
    logoImg.src = '../../assets/img/tec.png';
    const newWidth = 56.7; // Ancho ajustado para la imagen

    logoImg.onload = function () {
      doc.addImage(logoImg, 'PNG', 14, 14, newWidth, 14);

      // Información de la empresa al lado derecho de la imagen
      const empresaInfo = `Empresa: Instituto de Educación Superior Privado TEC\nRUC: 20283617000\nDirección: Jr. Huánuco Nº163\nCorreo Electrónico: INSTTEC@gmail.com\nTeléfono: 941 342 571`;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const textLines = doc.splitTextToSize(empresaInfo, 100);
      doc.text(textLines, 80, 14);

      // Línea divisoria
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(10, 35, doc.internal.pageSize.getWidth() - 10, 35);

      // Título debajo de la línea divisoria
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(titulo, doc.internal.pageSize.getWidth() / 2, 45, { align: 'center' });

      // Texto "Listado de chef" debajo del título
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');

      // Contenido en tablas con estilo SUNAT
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 10;
      const tableWidth = pageWidth - margin * 2; // 20mm total margin

      doc.autoTable({
        startY: 50, // Posición inicial de la tabla, debajo del texto "Listado de chef"
        head: [encabezado],
        body: cuerpo,
        theme: 'grid',
        headStyles: {
          fillColor: [173, 216, 230], // Color medio celeste para el encabezado
          textColor: [0, 0, 0], // Texto negro
          fontStyle: 'bold'
        },
        alternateRowStyles: { fillColor: [233, 236, 239] }, // Color gris claro para las filas alternas
        styles: {
          cellPadding: 4,
          fontSize: 10,
          textColor: [44, 62, 80], // Color gris oscuro para el texto
          lineColor: [44, 62, 80]  // Color gris oscuro para las líneas
        },
        margin: { top: 10, right: margin, bottom: 10, left: margin },
        tableWidth: 'auto',
        addPageContent: function () {
          const hoy = new Date();
          const fechaReporte = `Fecha de creación: ${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`;
          doc.setFontSize(10);
          doc.text(fechaReporte, margin, doc.internal.pageSize.getHeight() - 10);
        }
      });

      if (guardar) {
        const hoy = new Date();
        doc.save(`${entidad}_${hoy.getDate()}${hoy.getMonth() + 1}${hoy.getFullYear()}_${hoy.getTime()}.pdf`);
      }
    };

    logoImg.onerror = function () {
      // Error handling in case the image doesn't load
      console.error("Failed to load the image");
    };
  }
}
