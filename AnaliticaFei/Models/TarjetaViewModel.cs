using System.ComponentModel.DataAnnotations;

namespace AnaliticaFei.Models
{
    public class TarjetaViewModel
    {
        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Tarjeta de crédito")]
        public string Card_number {  get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Nombre como aparece en la tarjeta")]
        public string Name { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [Display(Name = "Expiración")]
        public string Expiry {  get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [StringLength(3, ErrorMessage = "El campo {0} debe ser una cadena con un máximo de {1} caracteres.")]
        [Display(Name = "CVV")]
        public string Cvv { get; set; }

    }
}
