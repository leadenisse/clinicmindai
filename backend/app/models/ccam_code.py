from sqlalchemy import Column, String, Integer, Float, Boolean, Text, Date
from app.database import Base
from app.models.base import TimestampMixin, generate_uuid


class CCAMCode(Base, TimestampMixin):
    """
    Code CCAM (Classification Commune des Actes Médicaux)
    Table de référence pour les actes dentaires
    """
    __tablename__ = "ccam_codes"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    # ══════════════════════════════════════════════════════════════
    # IDENTIFICATION
    # ══════════════════════════════════════════════════════════════

    code = Column(String(20), nullable=False, unique=True, index=True)

    label = Column(String(255), nullable=False)

    description = Column(Text)

    # ══════════════════════════════════════════════════════════════
    # CATÉGORISATION
    # ══════════════════════════════════════════════════════════════

    category = Column(String(100))

    subcategory = Column(String(100))

    chapter = Column(String(50))

    # ══════════════════════════════════════════════════════════════
    # TARIFICATION
    # ══════════════════════════════════════════════════════════════

    base_price = Column(Integer, nullable=False, default=0)

    regulated_price = Column(Integer)

    suggested_price = Column(Integer)

    reimbursement_rate = Column(Float, default=70.0)

    social_security_amount = Column(Integer)

    # ══════════════════════════════════════════════════════════════
    # RÈGLES
    # ══════════════════════════════════════════════════════════════

    requires_prior_approval = Column(Boolean, default=False)

    is_free_pricing = Column(Boolean, default=False)

    is_capped = Column(Boolean, default=False)

    capped_price = Column(Integer)

    modifier_coefficient = Column(Float, default=1.0)

    # ══════════════════════════════════════════════════════════════
    # LOCALISATION
    # ══════════════════════════════════════════════════════════════

    requires_tooth_number = Column(Boolean, default=False)

    applicable_teeth = Column(String(500))

    # ══════════════════════════════════════════════════════════════
    # VALIDITÉ
    # ══════════════════════════════════════════════════════════════

    valid_from = Column(Date)

    valid_until = Column(Date)

    is_active = Column(Boolean, default=True)

    # ══════════════════════════════════════════════════════════════
    # RECHERCHE
    # ══════════════════════════════════════════════════════════════

    keywords = Column(Text)

    def __repr__(self):
        return f"<CCAMCode {self.code}: {self.label}>"


# ══════════════════════════════════════════════════════════════════
# DONNÉES INITIALES - Codes CCAM dentaires courants
# ══════════════════════════════════════════════════════════════════

INITIAL_CCAM_CODES = [
    {
        "code": "C",
        "label": "Consultation",
        "category": "Consultation",
        "base_price": 2500,
        "reimbursement_rate": 70.0,
        "is_free_pricing": False,
    },
    {
        "code": "CS",
        "label": "Consultation spécialiste",
        "category": "Consultation",
        "base_price": 2500,
        "reimbursement_rate": 70.0,
    },
    {
        "code": "HBMD001",
        "label": "Détartrage et polissage des dents",
        "category": "Soins conservateurs",
        "subcategory": "Détartrage",
        "base_price": 2879,
        "reimbursement_rate": 70.0,
        "keywords": "détartrage, prophylaxie, nettoyage",
    },
    {
        "code": "HBBD001",
        "label": "Obturation 1 face",
        "category": "Soins conservateurs",
        "subcategory": "Obturation",
        "base_price": 2697,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
        "keywords": "carie, composite, amalgame, obturation",
    },
    {
        "code": "HBBD002",
        "label": "Obturation 2 faces",
        "category": "Soins conservateurs",
        "subcategory": "Obturation",
        "base_price": 4553,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
    },
    {
        "code": "HBBD003",
        "label": "Obturation 3 faces ou plus",
        "category": "Soins conservateurs",
        "subcategory": "Obturation",
        "base_price": 6531,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
    },
    {
        "code": "HBMD038",
        "label": "Pulpectomie incisive/canine",
        "category": "Endodontie",
        "subcategory": "Dévitalisation",
        "base_price": 3382,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
        "keywords": "dévitalisation, traitement canalaire",
    },
    {
        "code": "HBMD040",
        "label": "Pulpectomie prémolaire",
        "category": "Endodontie",
        "subcategory": "Dévitalisation",
        "base_price": 4859,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
    },
    {
        "code": "HBMD042",
        "label": "Pulpectomie molaire",
        "category": "Endodontie",
        "subcategory": "Dévitalisation",
        "base_price": 8182,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
    },
    {
        "code": "HBGD001",
        "label": "Extraction d'une dent temporaire",
        "category": "Chirurgie",
        "subcategory": "Extraction",
        "base_price": 2550,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
        "keywords": "extraction, dent de lait",
    },
    {
        "code": "HBGA001",
        "label": "Extraction d'une dent permanente",
        "category": "Chirurgie",
        "subcategory": "Extraction",
        "base_price": 3350,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
        "keywords": "extraction, avulsion",
    },
    {
        "code": "HBGA002",
        "label": "Extraction dent en désinclusion",
        "category": "Chirurgie",
        "subcategory": "Extraction",
        "base_price": 5967,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
        "keywords": "dent de sagesse, inclusion",
    },
    {
        "code": "HBGA003",
        "label": "Extraction de plusieurs dents",
        "category": "Chirurgie",
        "subcategory": "Extraction",
        "base_price": 5023,
        "reimbursement_rate": 70.0,
    },
    {
        "code": "HBJD001",
        "label": "Assainissement parodontal (par quadrant)",
        "category": "Parodontologie",
        "base_price": 3800,
        "reimbursement_rate": 70.0,
        "keywords": "surfaçage, parodontite",
    },
    {
        "code": "HBQK389",
        "label": "Radiographie rétroalvéolaire",
        "category": "Radiologie",
        "base_price": 540,
        "reimbursement_rate": 70.0,
        "keywords": "radio, cliché",
    },
    {
        "code": "HBQK001",
        "label": "Radiographie panoramique",
        "category": "Radiologie",
        "base_price": 2100,
        "reimbursement_rate": 70.0,
        "keywords": "panoramique, orthopantomogramme",
    },
    {
        "code": "HBLD038",
        "label": "Couronne métallique",
        "category": "Prothèses",
        "subcategory": "Couronne",
        "base_price": 10750,
        "suggested_price": 45000,
        "is_free_pricing": True,
        "requires_tooth_number": True,
        "keywords": "couronne, prothèse fixe",
    },
    {
        "code": "HBLD036",
        "label": "Couronne céramométallique",
        "category": "Prothèses",
        "subcategory": "Couronne",
        "base_price": 10750,
        "suggested_price": 55000,
        "is_free_pricing": True,
        "requires_tooth_number": True,
        "is_capped": True,
        "capped_price": 50000,
    },
    {
        "code": "HBLD040",
        "label": "Couronne céramo-céramique",
        "category": "Prothèses",
        "subcategory": "Couronne",
        "base_price": 10750,
        "suggested_price": 70000,
        "is_free_pricing": True,
        "requires_tooth_number": True,
    },
    {
        "code": "HBLD023",
        "label": "Inlay-core",
        "category": "Prothèses",
        "subcategory": "Infrastructure",
        "base_price": 9021,
        "is_free_pricing": True,
        "requires_tooth_number": True,
        "keywords": "faux-moignon, reconstitution",
    },
    {
        "code": "HBLD043",
        "label": "Prothèse amovible complète maxillaire",
        "category": "Prothèses",
        "subcategory": "Prothèse amovible",
        "base_price": 18270,
        "suggested_price": 130000,
        "is_free_pricing": True,
        "is_capped": True,
        "capped_price": 110000,
    },
    {
        "code": "HBLD044",
        "label": "Prothèse amovible complète mandibulaire",
        "category": "Prothèses",
        "subcategory": "Prothèse amovible",
        "base_price": 18270,
        "suggested_price": 130000,
        "is_free_pricing": True,
        "is_capped": True,
        "capped_price": 110000,
    },
    {
        "code": "HBLD050",
        "label": "Prothèse amovible partielle 1-3 dents",
        "category": "Prothèses",
        "subcategory": "Prothèse amovible",
        "base_price": 6442,
        "is_free_pricing": True,
    },
    {
        "code": "IMPL01",
        "label": "Pose d'implant dentaire",
        "category": "Implantologie",
        "base_price": 0,
        "suggested_price": 120000,
        "reimbursement_rate": 0,
        "is_free_pricing": True,
        "requires_tooth_number": True,
        "keywords": "implant, titane",
    },
    {
        "code": "IMPL02",
        "label": "Pilier implantaire",
        "category": "Implantologie",
        "base_price": 0,
        "suggested_price": 40000,
        "reimbursement_rate": 0,
        "is_free_pricing": True,
    },
    {
        "code": "IMPL03",
        "label": "Couronne sur implant",
        "category": "Implantologie",
        "base_price": 0,
        "suggested_price": 80000,
        "reimbursement_rate": 0,
        "is_free_pricing": True,
    },
    {
        "code": "ORTHO01",
        "label": "Traitement orthodontique (semestre)",
        "category": "Orthodontie",
        "base_price": 19332,
        "suggested_price": 75000,
        "is_free_pricing": True,
        "requires_prior_approval": True,
        "keywords": "appareil, bagues",
    },
    {
        "code": "HBMD029",
        "label": "Traitement d'urgence pulpite",
        "category": "Urgences",
        "base_price": 3000,
        "reimbursement_rate": 70.0,
        "requires_tooth_number": True,
        "keywords": "urgence, douleur, pulpite",
    },
]
